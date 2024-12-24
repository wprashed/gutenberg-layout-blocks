import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, Button } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

registerBlockType('gutenberg-layout-blocks/row', {
    title: 'Row',
    icon: 'columns',
    category: 'layout',
    attributes: {
        columnGap: { type: 'number', default: 10 },
        contentPosition: { type: 'string', default: 'top' },
        contentWidth: { type: 'string', default: 'full' },
        columnCount: { type: 'number', default: 2 },
        columnWidths: { type: 'array', default: [] },
        backgroundColor: { type: 'string', default: '' },
        padding: { type: 'object', default: { top: 10, right: 10, bottom: 10, left: 10, unit: 'px' } },
        margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' } },
    },
    edit: ({ attributes, setAttributes, clientId }) => {
        const [activeTab, setActiveTab] = useState('layout');
        const rowRef = useRef(null);
        const { replaceInnerBlocks } = useDispatch('core/block-editor');
        const { getBlocks } = useSelect((select) => select('core/block-editor'), []);

        const updateSpacing = (type, side, value) => {
            setAttributes({
                [type]: {
                    ...attributes[type],
                    [side]: value
                }
            });
        };

        const updateColumnCount = (count) => {
            const currentBlocks = getBlocks(clientId);
            const newColumnWidths = Array(count).fill(100 / count);
            
            // Create new column blocks or remove excess
            const updatedBlocks = Array(count).fill().map((_, index) => {
                if (currentBlocks[index]) {
                    return {
                        ...currentBlocks[index],
                        attributes: {
                            ...currentBlocks[index].attributes,
                            width: newColumnWidths[index]
                        }
                    };
                }
                return createBlock('gutenberg-layout-blocks/column', { width: newColumnWidths[index] });
            });

            replaceInnerBlocks(clientId, updatedBlocks, false);
            setAttributes({ columnCount: count, columnWidths: newColumnWidths });
        };

        useEffect(() => {
            const row = rowRef.current;
            if (!row) return;

            const resizer = document.createElement('div');
            resizer.className = 'column-resizer';
            resizer.style.cssText = 'width: 5px; background: #007cba; cursor: col-resize; position: absolute; top: 0; bottom: 0; right: -2.5px; opacity: 0; transition: opacity 0.3s;';

            const columns = row.querySelectorAll('.wp-block-gutenberg-layout-blocks-column');
            columns.forEach((column, index) => {
                if (index < columns.length - 1) {
                    const columnResizer = resizer.cloneNode();
                    column.style.position = 'relative';
                    column.appendChild(columnResizer);

                    let startX, startWidths;

                    const resize = (e) => {
                        const diff = e.pageX - startX;
                        const newWidths = startWidths.map((width, i) => {
                            if (i === index) return width + (diff / row.offsetWidth) * 100;
                            if (i === index + 1) return width - (diff / row.offsetWidth) * 100;
                            return width;
                        });

                        if (newWidths[index] > 10 && newWidths[index + 1] > 10) {
                            setAttributes({ columnWidths: newWidths });
                        }
                    };

                    const stopResize = () => {
                        window.removeEventListener('mousemove', resize);
                        window.removeEventListener('mouseup', stopResize);
                        columnResizer.style.opacity = '0';
                    };

                    columnResizer.addEventListener('mousedown', (e) => {
                        startX = e.pageX;
                        startWidths = [...attributes.columnWidths];
                        window.addEventListener('mousemove', resize);
                        window.addEventListener('mouseup', stopResize);
                        columnResizer.style.opacity = '1';
                    });

                    column.addEventListener('mouseover', () => {
                        columnResizer.style.opacity = '0.5';
                    });

                    column.addEventListener('mouseout', () => {
                        if (!columnResizer.matches(':active')) {
                            columnResizer.style.opacity = '0';
                        }
                    });
                }
            });
        }, [attributes.columnWidths]);

        return (
            <>
                <InspectorControls>
                    <div className="gutenberg-layout-blocks-tabs">
                        <button className={`tab ${activeTab === 'layout' ? 'active' : ''}`} onClick={() => setActiveTab('layout')}>Layout</button>
                        <button className={`tab ${activeTab === 'style' ? 'active' : ''}`} onClick={() => setActiveTab('style')}>Style</button>
                        <button className={`tab ${activeTab === 'advanced' ? 'active' : ''}`} onClick={() => setActiveTab('advanced')}>Advanced</button>
                    </div>
                    {activeTab === 'layout' && (
                        <PanelBody title="Layout" initialOpen={true}>
                            <RangeControl
                                label="Column Gap"
                                value={attributes.columnGap}
                                onChange={(value) => setAttributes({ columnGap: value })}
                                min={0}
                                max={100}
                            />
                            <SelectControl
                                label="Content Position"
                                value={attributes.contentPosition}
                                options={[
                                    { label: 'Top', value: 'top' },
                                    { label: 'Middle', value: 'middle' },
                                    { label: 'Bottom', value: 'bottom' },
                                ]}
                                onChange={(value) => setAttributes({ contentPosition: value })}
                            />
                            <SelectControl
                                label="Content Width"
                                value={attributes.contentWidth}
                                options={[
                                    { label: 'Full Width', value: 'full' },
                                    { label: 'Boxed', value: 'boxed' },
                                ]}
                                onChange={(value) => setAttributes({ contentWidth: value })}
                            />
                            <RangeControl
                                label="Column Count"
                                value={attributes.columnCount}
                                onChange={updateColumnCount}
                                min={1}
                                max={6}
                            />
                        </PanelBody>
                    )}
                    {activeTab === 'style' && (
                        <PanelBody title="Style" initialOpen={true}>
                            <ColorPalette
                                value={attributes.backgroundColor}
                                onChange={(color) => setAttributes({ backgroundColor: color })}
                                label="Background Color"
                            />
                        </PanelBody>
                    )}
                    {activeTab === 'advanced' && (
                        <PanelBody title="Advanced" initialOpen={true}>
                            <p>Margin</p>
                            {['top', 'right', 'bottom', 'left'].map((side) => (
                                <RangeControl
                                    key={`margin-${side}`}
                                    label={side.charAt(0).toUpperCase() + side.slice(1)}
                                    value={attributes.margin[side]}
                                    onChange={(value) => updateSpacing('margin', side, value)}
                                    min={-100}
                                    max={100}
                                />
                            ))}
                            <p>Padding</p>
                            {['top', 'right', 'bottom', 'left'].map((side) => (
                                <RangeControl
                                    key={`padding-${side}`}
                                    label={side.charAt(0).toUpperCase() + side.slice(1)}
                                    value={attributes.padding[side]}
                                    onChange={(value) => updateSpacing('padding', side, value)}
                                    min={0}
                                    max={100}
                                />
                            ))}
                        </PanelBody>
                    )}
                </InspectorControls>
                <div
                    ref={rowRef}
                    className="gutenberg-layout-blocks-row"
                    style={{
                        backgroundColor: attributes.backgroundColor,
                        padding: `${attributes.padding.top}${attributes.padding.unit} ${attributes.padding.right}${attributes.padding.unit} ${attributes.padding.bottom}${attributes.padding.unit} ${attributes.padding.left}${attributes.padding.unit}`,
                        margin: `${attributes.margin.top}${attributes.margin.unit} ${attributes.margin.right}${attributes.margin.unit} ${attributes.margin.bottom}${attributes.margin.unit} ${attributes.margin.left}${attributes.margin.unit}`,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: `${attributes.columnGap}px`,
                            alignItems: attributes.contentPosition === 'top' ? 'flex-start' : attributes.contentPosition === 'middle' ? 'center' : 'flex-end',
                            maxWidth: attributes.contentWidth === 'boxed' ? '1140px' : '100%',
                            margin: '0 auto',
                        }}
                    >
                        <InnerBlocks
                            allowedBlocks={['gutenberg-layout-blocks/column']}
                            orientation="horizontal"
                            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                        />
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div
                className="gutenberg-layout-blocks-row"
                style={{
                    backgroundColor: attributes.backgroundColor,
                    padding: `${attributes.padding.top}${attributes.padding.unit} ${attributes.padding.right}${attributes.padding.unit} ${attributes.padding.bottom}${attributes.padding.unit} ${attributes.padding.left}${attributes.padding.unit}`,
                    margin: `${attributes.margin.top}${attributes.margin.unit} ${attributes.margin.right}${attributes.margin.unit} ${attributes.margin.bottom}${attributes.margin.unit} ${attributes.margin.left}${attributes.margin.unit}`,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: `${attributes.columnGap}px`,
                        alignItems: attributes.contentPosition === 'top' ? 'flex-start' : attributes.contentPosition === 'middle' ? 'center' : 'flex-end',
                        maxWidth: attributes.contentWidth === 'boxed' ? '1140px' : '100%',
                        margin: '0 auto',
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});

