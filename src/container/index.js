import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl } from '@wordpress/components';

registerBlockType('gutenberg-layout-blocks/container', {
    title: 'Container',
    icon: 'layout',
    category: 'layout',
    attributes: {
        backgroundColor: { type: 'string', default: '' },
        backgroundImage: { type: 'string', default: '' },
        backgroundVideo: { type: 'string', default: '' },
        minHeight: { type: 'number', default: 0 },
        addShape: { type: 'boolean', default: false },
        shapeType: { type: 'string', default: 'wave' },
        shapeColor: { type: 'string', default: '#000000' },
    },
    edit: ({ attributes, setAttributes }) => {
        const onSelectImage = (media) => {
            setAttributes({ backgroundImage: media.url });
        };

        const onSelectVideo = (media) => {
            setAttributes({ backgroundVideo: media.url });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Container Settings">
                        <TextControl
                            label="Background Color"
                            value={attributes.backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={attributes.backgroundImage}
                                render={({ open }) => (
                                    <Button onClick={open}>
                                        {attributes.backgroundImage ? 'Change Background Image' : 'Add Background Image'}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectVideo}
                                allowedTypes={['video']}
                                value={attributes.backgroundVideo}
                                render={({ open }) => (
                                    <Button onClick={open}>
                                        {attributes.backgroundVideo ? 'Change Background Video' : 'Add Background Video'}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <RangeControl
                            label="Minimum Height (px)"
                            value={attributes.minHeight}
                            onChange={(value) => setAttributes({ minHeight: value })}
                            min={0}
                            max={1000}
                        />
                        <ToggleControl
                            label="Add Shape Divider"
                            checked={attributes.addShape}
                            onChange={(value) => setAttributes({ addShape: value })}
                        />
                        {attributes.addShape && (
                            <>
                                <TextControl
                                    label="Shape Type"
                                    value={attributes.shapeType}
                                    onChange={(value) => setAttributes({ shapeType: value })}
                                />
                                <TextControl
                                    label="Shape Color"
                                    value={attributes.shapeColor}
                                    onChange={(value) => setAttributes({ shapeColor: value })}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                <div
                    className="gutenberg-layout-blocks-container"
                    style={{
                        backgroundColor: attributes.backgroundColor,
                        backgroundImage: attributes.backgroundImage ? `url(${attributes.backgroundImage})` : 'none',
                        minHeight: attributes.minHeight ? `${attributes.minHeight}px` : 'auto',
                    }}
                >
                    {attributes.backgroundVideo && (
                        <video autoPlay muted loop className="background-video">
                            <source src={attributes.backgroundVideo} type="video/mp4" />
                        </video>
                    )}
                    {attributes.addShape && (
                        <div className="shape-divider" style={{ color: attributes.shapeColor }}>
                            {/* Add your shape SVG here based on attributes.shapeType */}
                        </div>
                    )}
                    <InnerBlocks allowedBlocks={['gutenberg-layout-blocks/row']} />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div
                className="gutenberg-layout-blocks-container"
                style={{
                    backgroundColor: attributes.backgroundColor,
                    backgroundImage: attributes.backgroundImage ? `url(${attributes.backgroundImage})` : 'none',
                    minHeight: attributes.minHeight ? `${attributes.minHeight}px` : 'auto',
                }}
            >
                {attributes.backgroundVideo && (
                    <video autoPlay muted loop className="background-video">
                        <source src={attributes.backgroundVideo} type="video/mp4" />
                    </video>
                )}
                {attributes.addShape && (
                    <div className="shape-divider" style={{ color: attributes.shapeColor }}>
                        {/* Add your shape SVG here based on attributes.shapeType */}
                    </div>
                )}
                <InnerBlocks.Content />
            </div>
        );
    },
});