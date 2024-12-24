import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, Button } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';

registerBlockType('gutenberg-layout-blocks/row', {
    title: 'Enhanced Row',
    icon: 'columns',
    category: 'layout',
    attributes: {
        gutterSize: { type: 'number', default: 16 },
        verticalAlignment: { type: 'string', default: 'top' },
        columnLayout: { type: 'string', default: 'equal' },
        backgroundColor: { type: 'string', default: '' },
        padding: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
        margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
    },
    edit: ({ attributes, setAttributes }) => {
        const [activeTab, setActiveTab] = useState('layout');
        const rowRef = useRef(null);

        useEffect(() => {
            const row = rowRef.current;
            if (!row) return;

            const resizer = document.createElement('div');
            resizer.className = 'column-resizer';
            resizer.style.cssText = 'width: 5px; background: #ccc; cursor: col-resize; position: absolute; top: 0; bottom: 0; right: -2.5px;';

            const columns = row.querySelectorAll('.wp-block-gutenberg-layout-blocks-column');
            columns.forEach((column, index) => {
                if (index < columns.length - 1) {
                    const columnResizer = resizer.cloneNode();
                    column.style.position = 'relative';
                    column.appendChild(columnResizer);

                    let startX, startWidth, nextStartWidth;

                    const resize = (e) => {
                        const diff = e.pageX - startX;
                        const newWidth = startWidth + diff;
                        const newNextWidth = nextStartWidth - diff;

                        if (newWidth > 0 && newNextWidth > 0) {
                            column.style.width = `${newWidth}px`;
                            column.nextElementSibling.style.width = `${newNextWidth}px`;
                        }
                    };

                    const stopResize = () => {
                        window.removeEventListener('mousemove', resize);
                        window.removeEventListener('mouseup', stopResize);
                    };

                    columnResizer.addEventListener('mousedown', (e) => {
                        startX = e.pageX;
                        startWidth = column.offsetWidth;
                        nextStartWidth = column.nextElementSibling.offsetWidth;

                        window.addEventListener('mousemove', resize);
                        window.addEventListener('mouseup', stopResize);
                    });
                }
            });
        }, []);

        const updateSpacing = (type, side, value) => {
            setAttributes({
                [type]: {
                    ...attributes[type],
                    [side]: value
                }
            });
        };

        return (
            <>
                <InspectorControls>
                    <div className="gutenberg-layout-blocks-tabs">
                        <button
                            className={`tab ${activeTab === 'layout' ? 'active' : ''}`}
                            onClick={() => setActiveTab('layout')}
                        >
                            Layout
                        </button>
                        <button
                            className={`tab ${activeTab === 'style' ? 'active' : ''}`}
                            onClick={() => setActiveTab('style')}
                        >
                            Style
                        </button>
                        <button
                            className={`tab ${activeTab === 'spacing' ? 'active' : ''}`}
                            onClick={() => setActiveTab('spacing')}
                        >
                            Spacing
                        </button>
                    </div>
                    {activeTab === 'layout' && (
                        <PanelBody title="Layout Settings" initialOpen={true}>
                            <RangeControl
                                label="Gutter Size"
                                value={attributes.gutterSize}
                                onChange={(value) => setAttributes({ gutterSize: value })}
                                min={0}
                                max={50}
                            />
                            <SelectControl
                                label="Vertical Alignment"
                                value={attributes.verticalAlignment}
                                options={[
                                    { label: 'Top', value: 'top' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Bottom', value: 'bottom' },
                                ]}
                                onChange={(value) => setAttributes({ verticalAlignment: value })}
                            />
                            <SelectControl
                                label="Column Layout"
                                value={attributes.columnLayout}
                                options={[
                                    { label: 'Equal Width', value: 'equal' },
                                    { label: 'Custom', value: 'custom' },
                                ]}
                                onChange={(value) => setAttributes({ columnLayout: value })}
                            />
                        </PanelBody>
                    )}
                    {activeTab === 'style' && (
                        <PanelBody title="Style Settings" initialOpen={true}>
                            <ColorPalette
                                value={attributes.backgroundColor}
                                onChange={(color) => setAttributes({ backgroundColor: color })}
                                label="Background Color"
                            />
                        </PanelBody>
                    )}
                    {activeTab === 'spacing' && (
                        <PanelBody title="Spacing Settings" initialOpen={true}>
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
                            <p>Margin</p>
                            {['top', 'right', 'bottom', 'left'].map((side) => (
                                <RangeControl
                                    key={`margin-${side}`}
                                    label={side.charAt(0).toUpperCase() + side.slice(1)}
                                    value={attributes.margin[side]}
                                    onChange={(value) => updateSpacing('margin', side, value)}
                                    min={0}
                                    max={100}
                                />
                            ))}
                        </PanelBody>
                    )}
                </InspectorControls>
                <div
                    ref={rowRef}
                    className={`gutenberg-layout-blocks-row align-${attributes.verticalAlignment}`}
                    style={{
                        display: 'flex',
                        gap: `${attributes.gutterSize}px`,
                        backgroundColor: attributes.backgroundColor,
                        padding: `${attributes.padding.top}px ${attributes.padding.right}px ${attributes.padding.bottom}px ${attributes.padding.left}px`,
                        margin: `${attributes.margin.top}px ${attributes.margin.right}px ${attributes.margin.bottom}px ${attributes.margin.left}px`,
                    }}
                >
                    <InnerBlocks
                        allowedBlocks={['gutenberg-layout-blocks/column']}
                        orientation="horizontal"
                        renderAppender={() => (
                            <Button
                                isPrimary
                                onClick={() => {
                                    // Logic to add a new column
                                }}
                            >
                                Add Column
                            </Button>
                        )}
                    />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div
                className={`gutenberg-layout-blocks-row align-${attributes.verticalAlignment}`}
                style={{
                    display: 'flex',
                    gap: `${attributes.gutterSize}px`,
                    backgroundColor: attributes.backgroundColor,
                    padding: `${attributes.padding.top}px ${attributes.padding.right}px ${attributes.padding.bottom}px ${attributes.padding.left}px`,
                    margin: `${attributes.margin.top}px ${attributes.margin.right}px ${attributes.margin.bottom}px ${attributes.margin.left}px`,
                }}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});
