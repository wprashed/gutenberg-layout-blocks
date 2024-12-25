import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('gutenberg-layout-blocks/row', {
    title: 'Row',
    icon: 'columns',
    category: 'layout',
    attributes: {
        columnGap: { type: 'number', default: 10 },
        contentPosition: { type: 'string', default: 'top' },
        contentWidth: { type: 'string', default: 'full' },
        columnCount: { type: 'number', default: 2 },
        backgroundColor: { type: 'string', default: '' },
        padding: { type: 'object', default: { top: 10, right: 10, bottom: 10, left: 10, unit: 'px' } },
        margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' } },
    },
    edit: ({ attributes, setAttributes }) => {
        const [activeTab, setActiveTab] = useState('layout');

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
                                onChange={(value) => setAttributes({ columnCount: value })}
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
