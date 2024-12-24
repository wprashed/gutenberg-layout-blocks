import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('gutenberg-layout-blocks/column', {
    title: 'Enhanced Column',
    icon: 'columns',
    category: 'layout',
    attributes: {
        width: { type: 'number', default: 100 },
        contentAlignment: { type: 'string', default: 'left' },
        verticalAlignment: { type: 'string', default: 'top' },
        backgroundColor: { type: 'string', default: '' },
        padding: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
        margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
        borderWidth: { type: 'number', default: 0 },
        borderColor: { type: 'string', default: '' },
        borderRadius: { type: 'number', default: 0 },
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
                                label="Width (%)"
                                value={attributes.width}
                                onChange={(value) => setAttributes({ width: value })}
                                min={1}
                                max={100}
                            />
                            <SelectControl
                                label="Content Alignment"
                                value={attributes.contentAlignment}
                                options={[
                                    { label: 'Left', value: 'left' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Right', value: 'right' },
                                ]}
                                onChange={(value) => setAttributes({ contentAlignment: value })}
                            />
                            <SelectControl
                                label="Vertical Alignment"
                                value={attributes.verticalAlignment}
                                options={[
                                    { label: 'Top', value: 'flex-start' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Bottom', value: 'flex-end' },
                                ]}
                                onChange={(value) => setAttributes({ verticalAlignment: value })}
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
                            <RangeControl
                                label="Border Width"
                                value={attributes.borderWidth}
                                onChange={(value) => setAttributes({ borderWidth: value })}
                                min={0}
                                max={10}
                            />
                            <ColorPalette
                                value={attributes.borderColor}
                                onChange={(color) => setAttributes({ borderColor: color })}
                                label="Border Color"
                            />
                            <RangeControl
                                label="Border Radius"
                                value={attributes.borderRadius}
                                onChange={(value) => setAttributes({ borderRadius: value })}
                                min={0}
                                max={50}
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
                    className="gutenberg-layout-blocks-column"
                    style={{
                        width: `${attributes.width}%`,
                        textAlign: attributes.contentAlignment,
                        backgroundColor: attributes.backgroundColor,
                        padding: `${attributes.padding.top}px ${attributes.padding.right}px ${attributes.padding.bottom}px ${attributes.padding.left}px`,
                        margin: `${attributes.margin.top}px ${attributes.margin.right}px ${attributes.margin.bottom}px ${attributes.margin.left}px`,
                        borderWidth: `${attributes.borderWidth}px`,
                        borderStyle: attributes.borderWidth > 0 ? 'solid' : 'none',
                        borderColor: attributes.borderColor,
                        borderRadius: `${attributes.borderRadius}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: attributes.verticalAlignment,
                    }}
                >
                    <InnerBlocks />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div
                className="gutenberg-layout-blocks-column"
                style={{
                    width: `${attributes.width}%`,
                    textAlign: attributes.contentAlignment,
                    backgroundColor: attributes.backgroundColor,
                    padding: `${attributes.padding.top}px ${attributes.padding.right}px ${attributes.padding.bottom}px ${attributes.padding.left}px`,
                    margin: `${attributes.margin.top}px ${attributes.margin.right}px ${attributes.margin.bottom}px ${attributes.margin.left}px`,
                    borderWidth: `${attributes.borderWidth}px`,
                    borderStyle: attributes.borderWidth > 0 ? 'solid' : 'none',
                    borderColor: attributes.borderColor,
                    borderRadius: `${attributes.borderRadius}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: attributes.verticalAlignment,
                }}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});
