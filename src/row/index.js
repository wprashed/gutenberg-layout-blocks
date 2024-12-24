import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';

registerBlockType('gutenberg-layout-blocks/row', {
    title: 'Row',
    icon: 'columns',
    category: 'layout',
    attributes: {
        gutterSize: { type: 'number', default: 16 },
    },
    edit: ({ attributes, setAttributes }) => {
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

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Row Settings">
                        <RangeControl
                            label="Gutter Size"
                            value={attributes.gutterSize}
                            onChange={(value) => setAttributes({ gutterSize: value })}
                            min={0}
                            max={50}
                        />
                    </PanelBody>
                </InspectorControls>
                <div ref={rowRef} className="gutenberg-layout-blocks-row" style={{ display: 'flex', gap: `${attributes.gutterSize}px` }}>
                    <InnerBlocks allowedBlocks={['gutenberg-layout-blocks/column']} />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div className="gutenberg-layout-blocks-row" style={{ display: 'flex', gap: `${attributes.gutterSize}px` }}>
                <InnerBlocks.Content />
            </div>
        );
    },
});