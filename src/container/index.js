import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl, SelectControl, RadioControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('gutenberg-layout-blocks/container', {
    title: 'Enhanced Container',
    icon: 'layout',
    category: 'layout',
    attributes: {
        backgroundColor: { type: 'string', default: '' },
        backgroundType: { type: 'string', default: 'color' },
        gradientColor1: { type: 'string', default: '' },
        gradientColor2: { type: 'string', default: '' },
        gradientDirection: { type: 'number', default: 90 },
        backgroundImage: { type: 'string', default: '' },
        backgroundPosition: { type: 'string', default: 'center center' },
        backgroundRepeat: { type: 'string', default: 'no-repeat' },
        backgroundSize: { type: 'string', default: 'cover' },
        backgroundVideo: { type: 'string', default: '' },
        backgroundVideoUrl: { type: 'string', default: '' },
        heightType: { type: 'string', default: 'auto' },
        heightValue: { type: 'number', default: 0 },
        heightUnit: { type: 'string', default: 'px' },
        minHeightValue: { type: 'number', default: 0 },
        minHeightUnit: { type: 'string', default: 'px' },
        addShape: { type: 'boolean', default: false },
        shapeType: { type: 'string', default: 'wave' },
        shapeColor: { type: 'string', default: '#000000' },
    },
    edit: ({ attributes, setAttributes }) => {
        const [activeTab, setActiveTab] = useState('background');

        const onSelectImage = (media) => {
            setAttributes({ backgroundImage: media.url });
        };

        const onSelectVideo = (media) => {
            setAttributes({ backgroundVideo: media.url });
        };

        const backgroundTypeOptions = [
            { label: 'Color', value: 'color' },
            { label: 'Gradient', value: 'gradient' },
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
        ];

        const heightTypeOptions = [
            { label: 'Auto', value: 'auto' },
            { label: 'Fixed', value: 'fixed' },
            { label: 'Min Height', value: 'min' },
        ];

        const renderBackgroundSettings = () => {
            switch (attributes.backgroundType) {
                case 'color':
                    return (
                        <ColorPalette
                            value={attributes.backgroundColor}
                            onChange={(color) => setAttributes({ backgroundColor: color })}
                        />
                    );
                case 'gradient':
                    return (
                        <>
                            <ColorPalette
                                value={attributes.gradientColor1}
                                onChange={(color) => setAttributes({ gradientColor1: color })}
                                label="Color 1"
                            />
                            <ColorPalette
                                value={attributes.gradientColor2}
                                onChange={(color) => setAttributes({ gradientColor2: color })}
                                label="Color 2"
                            />
                            <RangeControl
                                label="Gradient Direction"
                                value={attributes.gradientDirection}
                                onChange={(value) => setAttributes({ gradientDirection: value })}
                                min={0}
                                max={360}
                            />
                        </>
                    );
                case 'image':
                    return (
                        <>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.backgroundImage}
                                    render={({ open }) => (
                                        <Button onClick={open} isPrimary>
                                            {attributes.backgroundImage ? 'Change Background Image' : 'Add Background Image'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {attributes.backgroundImage && (
                                <>
                                    <SelectControl
                                        label="Background Position"
                                        value={attributes.backgroundPosition}
                                        options={[
                                            { label: 'Center Center', value: 'center center' },
                                            { label: 'Center Top', value: 'center top' },
                                            { label: 'Center Bottom', value: 'center bottom' },
                                            { label: 'Left Center', value: 'left center' },
                                            { label: 'Left Top', value: 'left top' },
                                            { label: 'Left Bottom', value: 'left bottom' },
                                            { label: 'Right Center', value: 'right center' },
                                            { label: 'Right Top', value: 'right top' },
                                            { label: 'Right Bottom', value: 'right bottom' },
                                        ]}
                                        onChange={(value) => setAttributes({ backgroundPosition: value })}
                                    />
                                    <SelectControl
                                        label="Background Repeat"
                                        value={attributes.backgroundRepeat}
                                        options={[
                                            { label: 'No Repeat', value: 'no-repeat' },
                                            { label: 'Repeat', value: 'repeat' },
                                            { label: 'Repeat X', value: 'repeat-x' },
                                            { label: 'Repeat Y', value: 'repeat-y' },
                                        ]}
                                        onChange={(value) => setAttributes({ backgroundRepeat: value })}
                                    />
                                    <SelectControl
                                        label="Background Size"
                                        value={attributes.backgroundSize}
                                        options={[
                                            { label: 'Cover', value: 'cover' },
                                            { label: 'Contain', value: 'contain' },
                                            { label: 'Auto', value: 'auto' },
                                        ]}
                                        onChange={(value) => setAttributes({ backgroundSize: value })}
                                    />
                                </>
                            )}
                        </>
                    );
                case 'video':
                    return (
                        <>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectVideo}
                                    allowedTypes={['video']}
                                    value={attributes.backgroundVideo}
                                    render={({ open }) => (
                                        <Button onClick={open} isPrimary>
                                            {attributes.backgroundVideo ? 'Change Background Video' : 'Add Background Video'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            <TextControl
                                label="Video URL"
                                value={attributes.backgroundVideoUrl}
                                onChange={(value) => setAttributes({ backgroundVideoUrl: value })}
                                help="Enter a URL for an external video"
                            />
                        </>
                    );
            }
        };

        const getBackgroundStyles = () => {
            switch (attributes.backgroundType) {
                case 'color':
                    return { backgroundColor: attributes.backgroundColor };
                case 'gradient':
                    return {
                        background: `linear-gradient(${attributes.gradientDirection}deg, ${attributes.gradientColor1}, ${attributes.gradientColor2})`,
                    };
                case 'image':
                    return {
                        backgroundImage: `url(${attributes.backgroundImage})`,
                        backgroundPosition: attributes.backgroundPosition,
                        backgroundRepeat: attributes.backgroundRepeat,
                        backgroundSize: attributes.backgroundSize,
                    };
                case 'video':
                    return {}; // Video background is handled separately
                default:
                    return {};
            }
        };

        const getHeightStyles = () => {
            switch (attributes.heightType) {
                case 'fixed':
                    return { height: `${attributes.heightValue}${attributes.heightUnit}` };
                case 'min':
                    return { minHeight: `${attributes.minHeightValue}${attributes.minHeightUnit}` };
                default:
                    return {};
            }
        };

        return (
            <>
                <InspectorControls>
                    <div className="gutenberg-layout-blocks-tabs">
                        <button
                            className={`tab ${activeTab === 'background' ? 'active' : ''}`}
                            onClick={() => setActiveTab('background')}
                        >
                            Background
                        </button>
                        <button
                            className={`tab ${activeTab === 'height' ? 'active' : ''}`}
                            onClick={() => setActiveTab('height')}
                        >
                            Height
                        </button>
                        <button
                            className={`tab ${activeTab === 'shape' ? 'active' : ''}`}
                            onClick={() => setActiveTab('shape')}
                        >
                            Shape Divider
                        </button>
                    </div>
                    {activeTab === 'background' && (
                        <PanelBody title="Background Settings" initialOpen={true}>
                            <RadioControl
                                label="Background Type"
                                selected={attributes.backgroundType}
                                options={backgroundTypeOptions}
                                onChange={(value) => setAttributes({ backgroundType: value })}
                            />
                            {renderBackgroundSettings()}
                        </PanelBody>
                    )}
                    {activeTab === 'height' && (
                        <PanelBody title="Height Settings" initialOpen={true}>
                            <RadioControl
                                label="Height Type"
                                selected={attributes.heightType}
                                options={heightTypeOptions}
                                onChange={(value) => setAttributes({ heightType: value })}
                            />
                            {attributes.heightType !== 'auto' && (
                                <>
                                    <RangeControl
                                        label={attributes.heightType === 'fixed' ? 'Height' : 'Min Height'}
                                        value={attributes.heightType === 'fixed' ? attributes.heightValue : attributes.minHeightValue}
                                        onChange={(value) =>
                                            setAttributes(
                                                attributes.heightType === 'fixed'
                                                    ? { heightValue: value }
                                                    : { minHeightValue: value }
                                            )
                                        }
                                        min={0}
                                        max={1000}
                                    />
                                    <SelectControl
                                        label="Unit"
                                        value={attributes.heightType === 'fixed' ? attributes.heightUnit : attributes.minHeightUnit}
                                        options={[
                                            { label: 'px', value: 'px' },
                                            { label: 'vh', value: 'vh' },
                                        ]}
                                        onChange={(value) =>
                                            setAttributes(
                                                attributes.heightType === 'fixed'
                                                    ? { heightUnit: value }
                                                    : { minHeightUnit: value }
                                            )
                                        }
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}
                    {activeTab === 'shape' && (
                        <PanelBody title="Shape Divider Settings" initialOpen={true}>
                            <ToggleControl
                                label="Add Shape Divider"
                                checked={attributes.addShape}
                                onChange={(value) => setAttributes({ addShape: value })}
                            />
                            {attributes.addShape && (
                                <>
                                    <SelectControl
                                        label="Shape Type"
                                        value={attributes.shapeType}
                                        options={[
                                            { label: 'Wave', value: 'wave' },
                                            { label: 'Triangle', value: 'triangle' },
                                            { label: 'Curve', value: 'curve' },
                                        ]}
                                        onChange={(value) => setAttributes({ shapeType: value })}
                                    />
                                    <ColorPalette
                                        value={attributes.shapeColor}
                                        onChange={(color) => setAttributes({ shapeColor: color })}
                                        label="Shape Color"
                                    />
                                </>
                            )}
                        </PanelBody>
                    )}
                </InspectorControls>
                <div
                    className="gutenberg-layout-blocks-container"
                    style={{
                        ...getBackgroundStyles(),
                        ...getHeightStyles(),
                    }}
                >
                    {attributes.backgroundType === 'video' && (attributes.backgroundVideo || attributes.backgroundVideoUrl) && (
                        <video autoPlay muted loop className="background-video">
                            <source src={attributes.backgroundVideo || attributes.backgroundVideoUrl} type="video/mp4" />
                        </video>
                    )}
                    {attributes.addShape && (
                        <div className="shape-divider" style={{ color: attributes.shapeColor }}>
                            {/* Add your shape SVG here based on attributes.shapeType */}
                            {attributes.shapeType === 'wave' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                    <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>
                            )}
                            {attributes.shapeType === 'triangle' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                    <path fill="currentColor" fillOpacity="1" d="M0,320L1440,0L1440,320L0,320Z"></path>
                                </svg>
                            )}
                            {attributes.shapeType === 'curve' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                    <path fill="currentColor" fillOpacity="1" d="M0,224L1440,32L1440,320L0,320Z"></path>
                                </svg>
                            )}
                        </div>
                    )}
                    <InnerBlocks allowedBlocks={['gutenberg-layout-blocks/row']} />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const getBackgroundStyles = () => {
            switch (attributes.backgroundType) {
                case 'color':
                    return { backgroundColor: attributes.backgroundColor };
                case 'gradient':
                    return {
                        background: `linear-gradient(${attributes.gradientDirection}deg, ${attributes.gradientColor1}, ${attributes.gradientColor2})`,
                    };
                case 'image':
                    return {
                        backgroundImage: `url(${attributes.backgroundImage})`,
                        backgroundPosition: attributes.backgroundPosition,
                        backgroundRepeat: attributes.backgroundRepeat,
                        backgroundSize: attributes.backgroundSize,
                    };
                case 'video':
                    return {}; // Video background is handled separately
                default:
                    return {};
            }
        };

        const getHeightStyles = () => {
            switch (attributes.heightType) {
                case 'fixed':
                    return { height: `${attributes.heightValue}${attributes.heightUnit}` };
                case 'min':
                    return { minHeight: `${attributes.minHeightValue}${attributes.minHeightUnit}` };
                default:
                    return {};
            }
        };

        return (
            <div
                className="gutenberg-layout-blocks-container"
                style={{
                    ...getBackgroundStyles(),
                    ...getHeightStyles(),
                }}
            >
                {attributes.backgroundType === 'video' && (attributes.backgroundVideo || attributes.backgroundVideoUrl) && (
                    <video autoPlay muted loop className="background-video">
                        <source src={attributes.backgroundVideo || attributes.backgroundVideoUrl} type="video/mp4" />
                    </video>
                )}
                {attributes.addShape && (
                    <div className="shape-divider" style={{ color: attributes.shapeColor }}>
                        {attributes.shapeType === 'wave' && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        )}
                        {attributes.shapeType === 'triangle' && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="currentColor" fillOpacity="1" d="M0,320L1440,0L1440,320L0,320Z"></path>
                            </svg>
                        )}
                        {attributes.shapeType === 'curve' && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="currentColor" fillOpacity="1" d="M0,224L1440,32L1440,320L0,320Z"></path>
                            </svg>
                        )}
                    </div>
                )}
                <InnerBlocks.Content />
            </div>
        );
    },
});