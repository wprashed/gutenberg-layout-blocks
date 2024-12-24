import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';

registerBlockType('gutenberg-layout-blocks/column', {
    title: 'Column',
    icon: 'columns',
    category: 'layout',
    attributes: {
        width: { type: 'number', default: 100 },
        contentAlignment: { type: 'string', default: 'left' },
        margin: { type: 'string', default: '' },
        padding: { type: 'string', default: '' },
    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Column Settings">
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
                        <TextControl
                            label="Margin"
                            value={attributes.margin}
                            onChange={(value) => setAttributes({ margin: value })}
                            help="Enter margin values (e.g., '10px 20px')"
                        />
                        <TextControl
                            label="Padding"
                            value={attributes.padding}
                            onChange={(value) => setAttributes({ padding: value })}
                            help="Enter padding values (e.g., '10px 20px')"
                        />
                    </PanelBody>
                </InspectorControls>
                <div
                    className="gutenberg-layout-blocks-column"
                    style={{
                        width: `${attributes.width}%`,
                        textAlign: attributes.contentAlignment,
                        margin: attributes.margin,
                        padding: attributes.padding,
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
                    margin: attributes.margin,
                    padding: attributes.padding,
                }}
            >
                <InnerBlocks.Content />
            </div>
        );
    },
});