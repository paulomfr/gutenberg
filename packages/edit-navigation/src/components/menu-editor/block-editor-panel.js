/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import {
	BlockList,
	BlockToolbar,
	NavigableToolbar,
	ObserveTyping,
	WritingFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button, Panel, PanelBody, Popover } from '@wordpress/components';

export default function BlockEditorPanel( { menuId, saveBlocks } ) {
	const { clearSelectedBlock } = useDispatch( 'core/block-editor' );
	const isNavigationModeActive = useSelect(
		( select ) => select( 'core/block-editor' ).isNavigationMode(),
		[]
	);

	// Clear the selected block when the menu is changed.
	// Block selection isn't cleared implicity by the block-editor store.
	// Dispatching this action fixes an issue where the toolbar
	// for a block continues to be displayed after it no longer exists.
	useEffect( () => {
		clearSelectedBlock();
	}, [ menuId ] );

	return (
		<Panel
			header={
				<Button isPrimary onClick={ saveBlocks }>
					{ __( 'Save navigation' ) }
				</Button>
			}
		>
			<PanelBody title={ __( 'Navigation menu' ) }>
				<NavigableToolbar
					className={ classnames(
						'edit-navigation-menu-editor__block-editor-toolbar',
						{
							'is-hidden': isNavigationModeActive,
						}
					) }
					aria-label={ __( 'Block tools' ) }
				>
					<BlockToolbar hideDragHandle />
				</NavigableToolbar>
				<Popover.Slot name="block-toolbar" />
				<WritingFlow>
					<ObserveTyping>
						<BlockList />
					</ObserveTyping>
				</WritingFlow>
			</PanelBody>
		</Panel>
	);
}
