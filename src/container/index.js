import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl, SelectControl, RadioControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('gutenberg-layout-blocks/container', {
    title: 'Container',
    icon: 'layout',
    category: 'layout',
    attributes: {
        contentWidth: { type: 'string', default: 'boxed' },
        width: { type: 'number', default: 1140 },
        minHeight: { type: 'number', default: 0 },
        backgroundColor: { type: 'string', default: '' },
        backgroundType: { type: 'string', default: 'classic' },
        backgroundImage: { type: 'string', default: '' },
        backgroundPosition: { type: 'string', default: 'center center' },
        backgroundAttachment: { type: 'string', default: 'scroll' },
        backgroundRepeat: { type: 'string', default: 'no-repeat' },
        backgroundSize: { type: 'string', default: 'cover' },
        overlayColor: { type: 'string', default: '' },
        overlayOpacity: { type: 'number', default: 0.5 },
        padding: { type: 'object', default: { top: 10, right: 10, bottom: 10, left: 10, unit: 'px' } },
        margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' } },
        zIndex: { type: 'number', default: 0 },
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
                            <SelectControl
                                label="Content Width"
                                value={attributes.contentWidth}
                                options={[
                                    { label: 'Boxed', value: 'boxed' },
                                    { label: 'Full Width', value: 'full' },
                                ]}
                                onChange={(value) => setAttributes({ contentWidth: value })}
                            />
                            {attributes.contentWidth === 'boxed' && (
                                <RangeControl
                                    label="Width"
                                    value={attributes.width}
                                    onChange={(value) => setAttributes({ width: value })}
                                    min={300}
                                    max={2000}
                                />
                            )}
                            <RangeControl
                                label="Minimum Height"
                                value={attributes.minHeight}
                                onChange={(value) => setAttributes({ minHeight: value })}
                                min={0}
                                max={1000}
                            />
                        </PanelBody>
                    )}
                    {activeTab === 'style' && (
                        <PanelBody title="Style" initialOpen={true}>
                            <SelectControl
                                label="Background Type"
                                value={attributes.backgroundType}
                                options={[
                                    { label: 'Classic', value: 'classic' },
                                    { label: 'Gradient', value: 'gradient' },
                                ]}
                                onChange={(value) => setAttributes({ backgroundType: value })}
                            />
                            {attributes.backgroundType === 'classic' && (
                                <>
                                    <ColorPalette
                                        value={attributes.backgroundColor}
                                        onChange={(color) => setAttributes({ backgroundColor: color })}
                                        label="Background Color"
                                    />
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => setAttributes({ backgroundImage: media.url })}
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
                                                    { label: 'Center Left', value: 'center left' },
                                                    { label: 'Center Right', value: 'center right' },
                                                    { label: 'Top Center', value: 'top center' },
                                                    { label: 'Top Left', value: 'top left' },
                                                    { label: 'Top Right', value: 'top right' },
                                                    { label: 'Bottom Center', value: 'bottom center' },
                                                    { label: 'Bottom Left', value: 'bottom left' },
                                                    { label: 'Bottom Right', value: 'bottom right' },
                                                ]}
                                                onChange={(value) => setAttributes({ backgroundPosition: value })}
                                            />
                                            <SelectControl
                                                label="Background Attachment"
                                                value={attributes.backgroundAttachment}
                                                options={[
                                                    { label: 'Scroll', value: 'scroll' },
                                                    { label: 'Fixed', value: 'fixed' },
                                                ]}
                                                onChange={(value) => setAttributes({ backgroundAttachment: value })}
                                            />
                                            <SelectControl
                                                label="Background Repeat"
                                                value={attributes.backgroundRepeat}
                                                options={[
                                                    { label: 'No Repeat', value: 'no-repeat' },
                                                    { label: 'Repeat', value: 'repeat' },
                                                    { label: 'Repeat-X', value: 'repeat-x' },
                                                    { label: 'Repeat-Y', value: 'repeat-y' },
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
                            )}
                            {attributes.backgroundType === 'gradient' && (
                                // Add gradient controls here
                                <p>Gradient controls to be implemented</p>
                            )}
                            <ColorPalette
                                value={attributes.overlayColor}
                                onChange={(color) => setAttributes({ overlayColor: color })}
                                label="Background Overlay"
                            />
                            <RangeControl
                                label="Overlay Opacity"
                                value={attributes.overlayOpacity}
                                onChange={(value) => setAttributes({ overlayOpacity: value })}
                                min={0}
                                max={1}
                                step={0.1}
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
                            <RangeControl
                                label="Z-Index"
                                value={attributes.zIndex}
                                onChange={(value) => setAttributes({ zIndex: value })}
                                min={-999}
                                max={999}
                            />
                        </PanelBody>
                    )}
                </InspectorControls>
                <div
                    className="gutenberg-layout-blocks-container"
                    style={{
                        backgroundColor: attributes.backgroundColor,
                        backgroundImage: attributes.backgroundImage ? `url(${attributes.backgroundImage})` : 'none',
                        backgroundPosition: attributes.backgroundPosition,
                        backgroundAttachment: attributes.backgroundAttachment,
                        backgroundRepeat: attributes.backgroundRepeat,
                        backgroundSize: attributes.backgroundSize,
                        minHeight: attributes.minHeight ? `${attributes.minHeight}px` : 'auto',
                        padding: `${attributes.padding.top}${attributes.padding.unit} ${attributes.padding.right}${attributes.padding.unit} ${attributes.padding.bottom}${attributes.padding.unit} ${attributes.padding.left}${attributes.padding.unit}`,
                        margin: `${attributes.margin.top}${attributes.margin.unit} ${attributes.margin.right}${attributes.margin.unit} ${attributes.margin.bottom}${attributes.margin.unit} ${attributes.margin.left}${attributes.margin.unit}`,
                        zIndex: attributes.zIndex,
                        position: 'relative',
                    }}
                >
                    {attributes.overlayColor && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: attributes.overlayColor,
                                opacity: attributes.overlayOpacity,
                            }}
                        />
                    )}
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: attributes.contentWidth === 'boxed' ? `${attributes.width}px` : '100%', margin: '0 auto' }}>
                        <InnerBlocks />
                    </div>
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
                    backgroundPosition: attributes.backgroundPosition,
                    backgroundAttachment: attributes.backgroundAttachment,
                    backgroundRepeat: attributes.backgroundRepeat,
                    backgroundSize: attributes.backgroundSize,
                    minHeight: attributes.minHeight ? `${attributes.minHeight}px` : 'auto',
                    padding: `${attributes.padding.top}${attributes.padding.unit} ${attributes.padding.right}${attributes.padding.unit} ${attributes.padding.bottom}${attributes.padding.unit} ${attributes.padding.left}${attributes.padding.unit}`,
                    margin: `${attributes.margin.top}${attributes.margin.unit} ${attributes.margin.right}${attributes.margin.unit} ${attributes.margin.bottom}${attributes.margin.unit} ${attributes.margin.left}${attributes.margin.unit}`,
                    zIndex: attributes.zIndex,
                    position: 'relative',
                }}
            >
                {attributes.overlayColor && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: attributes.overlayColor,
                            opacity: attributes.overlayOpacity,
                        }}
                    />
                )}
                <div style={{ position: 'relative', zIndex: 1, maxWidth: attributes.contentWidth === 'boxed' ? `${attributes.width}px` : '100%', margin: '0 auto' }}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
