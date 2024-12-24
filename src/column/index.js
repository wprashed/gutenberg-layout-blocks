import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { cloneBlock } from '@wordpress/blocks';

registerBlockType('gutenberg-layout-blocks/column', {
    title: 'Column',
    icon: 'columns',
    category: 'layout',
    attributes: {
        width: { type: 'number', default: 100 },
        backgroundColor: { type: 'string', default: '' },
        padding: { type: 'object', default: { top: 10, right: 10, bottom: 10, left: 10, unit: 'px' } },
        margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' } },
        verticalAlignment: { type: 'string', default: 'top' },
    },
    edit: ({ attributes, setAttributes, clientId }) => {
        const [activeTab, setActiveTab] = useState('layout');
        const { duplicateBlocks } = useDispatch('core/block-editor');
        const { getBlockRootClientId, getBlocks } = useSelect((select) => select('core/block-editor'), []);

        const updateSpacing = (type, side, value) => {
            setAttributes({
                [type]: {
                    ...attributes[type],
                    [side]: value
                }
            });
        };

        constduplicateColumn = () => {
            const parentClientId = getBlockRootClientId(clientId);
            const parentBlocks = getBlocks(parentClientId);
            const columnIndex = parentBlocks.findIndex(block => block.clientId === clientId);
            const newColumnClientId = cloneBlock(clientId).clientId;
            duplicateBlocks([clientId]);
            
            // Update column widths
            const totalColumns = parentBlocks.length + 1;
            const newWidth = 100 / totalColumns;
            parentBlocks.forEach((block, index) => {
                if (index === columnIndex || index === columnIndex + 1) {
                    block.attributes.width = newWidth;
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
                                label="Width (%)"
                                value={attributes.width}
                                onChange={(value) => setAttributes({ width: value })}
                                min={0}
                                max={100}
                            />
                            <SelectControl
                                label="Vertical Alignment"
                                value={attributes.verticalAlignment}
                                options={[
                                    { label: 'Top', value: 'top' },
                                    { label: 'Middle', value: 'middle' },
                                    { label: 'Bottom', value: 'bottom' },
                                ]}
                                onChange={(value) => setAttributes({ verticalAlignment: value })}
                            />
                            <Button isPrimary onClick={duplicateColumn}>
                                Duplicate Column
                            </Button>
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
                    className="gutenberg-layout-blocks-column"
                    style={{
                        width: `${attributes.width}%`,
                        backgroundColor: attributes.backgroundColor,
                        padding: `${attributes.padding.top}${attributes.padding.unit} ${attributes.padding.right}${attributes.padding.unit} ${attributes.padding.bottom}${attributes.padding.unit} ${attributes.padding.left}${attributes.padding.unit}`,
                        margin: `${attributes.margin.top}${attributes.margin.unit} ${attributes.margin.right}${attributes.margin.unit} ${attributes.margin.bottom}${attributes.margin.unit} ${attributes.margin.left}${attributes.margin.unit}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: attributes.verticalAlignment === 'top' ? 'flex-start' : attributes.verticalAlignment === 'middle' ? 'center' : 'flex-end',
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
                    backgroundColor: attributes.backgroundColor,
                    padding: `${attributes.padding.top}${attributes.padding.unit} ${attributes.padding.right}${attributes.padding.unit} ${attributes.padding.bottom}${attributes.padding.unit} ${attributes.padding.left}${attributes.padding.unit}`,
                    margin: `${attributes.margin.top}${attributes.margin.unit} ${attributes.margin.right}${attributes.margin.unit} ${attributes.margin.bottom}${attributes.margin.unit} ${attributes.margin.left}${attributes.margin.unit}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: attributes.verticalAlignment === 'top' ? 'flex-start' : attributes.verticalAlignment === 'middle' ? 'center' : 'flex-end',
                }}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});

