;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory() : typeof define === 'function' && define.amd
  ? define(factory) : global.ClassName = factory();
}(this, function () {
  const ICON_CLASS = 'cpts-icon',
        FILLED_ICON_CLASS = 'cpts-icon-filled',
        WARNING_ICON_CLASS = 'cpts-warn-icon',
        SUCCESS_ICON_CLASS = 'cpts-success-icon',
        INFO_ICON_CLASS = 'cpts-info-icon',
        ERROR_ICON_CLASS = 'cpts-error-icon',
        CONFIRM_ICON_CLASS = 'cpts-confirm-icon',
        CLOSE_ICON_CLASS = 'cpts-close-icon',
        SPIN_ICON_CLASS = 'cpts-spin-icon',
        LOADING_ICON_CLASS = 'cpts-loading-icon';

  const DEFAULT_BTN_CLASS = 'cpts-btn',
        GHOST_BTN_CLASS = 'cpts-ghost-btn',
        PRIMARY_BTN_CLASS = 'cpts-primary-btn',
        DANGER_BTN_CLASS = 'cpts-danger-btn',
        DASHED_BTN_CLASS = 'cpts-dashed-btn',
        LINK_BTN_CLASS = 'cpts-link-btn',
        CIRCLE_BTN_CLASS = 'cpts-circle-btn',
        ROUND_BTN_CLASS = 'cpts-round-btn',
        LARGE_BTN_CLASS = 'cpts-large-btn',
        SMALL_BTN_CLASS = 'cpts-small-btn',
        BLOCK_BTN_CLASS = 'cpts-block-btn',
        WITHICON_BTN_CLASS = 'cpts-with-icon-btn',
        LOADING_BTN_CLASS = 'cpts-loading-btn';

  const TAB_ITEM_CLASS = 'cpts-tabs-tab-item',
        TAB_ITEM_CLASS_ACTIVE = 'cpts-tabs-tab-item-active',
        TAB_ITEM_CARD_CLASS = 'cpts-tabs-tab-card-item',
        TAB_ITEM_WRAP_CLASS = 'cpts-tabs-tab-wrapper',
        TAB_ITEM_INNER_CLASS = 'cpts-tabs-tab-inner',
        TAB_ITEM_CARD_INNER_CALSS = 'cpts-tabs-tab-card-inner',
        TAB_ITEM_CONTAINER_CLASS = 'cpts-tabs-tab-container',
        TAB_ITEM_CONTAINER_WITH_ARROW_CLASS = 'cpts-tabs-tab-with-arrow-container',

        PANE_ITEM_CLASS = 'cpts-tabs-pane-item',
        PANE_ITEM_CLASS_ACTIVE = 'cpts-tabs-pane-item-active',
        PANE_ITEM_WRAP_CLASS = 'cpts-tabs-pane-wrapper',

        TAB_ARROW_CLASS = 'cpts-tabs-arrow',
        TAB_ARROW_CLASS_DISABLE = 'cpts-tabs-arrow-disable',
        TAB_ARROW_CLASS_INVISIBLE = 'cpts-tabs-arrow-invisible',
        TAB_PREVIOUS_ARROW_CLASS = 'cpts-tabs-prev-arrow',
        TAB_NEXT_ARROW_CLASS = 'cpts-tabs-next-arrow',

        TAB_CONTAINER_CLASS = 'cpts-tabs-container',

        UNDERLINE_CLASS = 'cpts-tabs-underline';

  const PAGINATION_ITEM_CLASS = 'cpts-pagination-item',
        PAGINATION_ITEM_CLASS_ACTIVE = 'cpts-pagination-item-active',
        PAGINATION_ITEM_CLASS_BORDER = 'cpts-pagination-item-border',
        PAGINATION_ITEM_CLASS_DISABLE = 'cpts-pagination-item-disable',
        PAGINATION_ITEM_CLASS_PREV = 'cpts-pagination-item-previous',
        PAGINATION_ITEM_CLASS_NEXT = 'cpts-pagination-item-next',
        PAGINATION_CONTAINER_CLASS = 'cpts-pagination-container',
        PAGINATION_ITEM_MORE_CLASS = 'cpts-pagination-item-more',
        PAGINATION_ITEM_NEXT_MORE_CLASS = 'cpts-pagination-item-next-more',
        PAGINATION_ITEM_PREV_MORE_CLASS = 'cpts-pagination-item-prev-more';

  const MESSAGE_TEXTCLASS = 'cpts-message-text-box',
        MESSAGE_CONTAINERCLASS = 'cpts-message-contaier',
        MESSAGE_ICONCLASS = 'cpts-message-icon';

  const GALLERY_BUTTON_NEXT_CLASS = 'cpts-gallery-swiper-button-next',
        GALLERY_BUTTON_PREV_CLASS = 'cpts-gallery-swiper-button-prev',
        GALLERY_PAGINATION_CLASS = 'cpts-gallery-swiper-pagination',
        GALLERY_SWIPER_CONTAINER_CLASS = 'cpts-gallery-swiper-container',
        GALLERY_WRAPPER_CLASS = 'cpts-gallery-wrapper',
        GALLERY_CONTAINER_CLASS = 'cpts-gallery-contaier',
        GALLERY_CONTAINER_CLASS_HIDDEN = 'cpts-gallery-contaier-invisible';

  const CARD_LIST_ITEM_INNER_CLASS = 'cardList-item-inner',
        CARD_LIST_ITEM_CLASS = 'cardList-item';

  const ALERT_MESSAGE_CLASS = 'cpts-alert-message',
        ALERT_DESCRIPTION_CLASS = 'cpts-alert-description',
        ALERT_ICON_CLASS = 'cpts-alert-icon',
        ALERT_CLOSE_ICON = 'cpts-alert-close-icon',
        ALERT_WARN_CLASS = 'cpts-alert-warn',
        ALERT_SUCCESS_CLASS = 'cpts-alert-success',
        ALERT_ERROR_CLASS = 'cpts-alert-error',
        ALERT_INFO_CLASS = 'cpts-alert-info',
        ALERT_CONTAINER_CLASS = 'cpts-alert-container',
        ALERT_WITH_ICON_CLASS = 'cpts-alert-with-icon',
        ALERT_WITH_DESC_CLASS = 'cpts-alert-with-desc',
        ALERT_WITH_CLOSE_CLASS = 'cpts-alert-with-close',
        ALERT_INVISIBLE_CLASS = 'cpts-alert-invisible',
        ALERT_SLIDEUP_CLASS = 'cpts-alert-slideUp',
        ALERT_SLIDEDOWN_CLASS = 'cpts-alert-slideDown';

  const MODAL_FOOTER_CONTAINER_CLASS = 'cpts-modal-footer-container',
        MODAL_FOOTER_WRAP_CLASS = 'cpts-modal-footer-wrapper',
        MODAL_FOOTER_OK_BTN_CLASS = 'cpts-modal-footer-ok-button',
        MODAL_FOOTER_CANCEL_BTN_CLASS = 'cpts-modal-footer-cancel-button',

        MODAL_HEADER_CONTAINER_CLASS = 'cpts-modal-header-container',
        MODAL_HEADER_WRAP_CLASS = 'cpts-modal-header-wrapper',

        MODAL_CLOSE_ICON_CLASS = 'cpts-modal-close-icon',

        MODAL_BODY_CLASS = 'cpts-modal-body',

        MODAL_CONTAINER_CLASS = 'cpts-modal-container',
        MODAL_CONTAINER_CENTERED_CLASS = 'cpts-modal-centered',
        MODAL_CONTAINER_INVISIBLE_CLASS = 'cpts-modal-container-invisible',
        
        MODAL_MASK_CLASS = 'cpts-modal-mask',
        MODAL_MASK_INVISIBLE_CLASS = 'cpts-modal-mask-invisible';

  const MODAL_CONFIRM_CONTAINER_CLASS = 'cpts-confirm-modal',
        MODAL_INFO_CONTAINER_CLASS = 'cpts-info-modal',
        MODAL_ERROR_CONTAINER_CLASS = 'cpts-error-modal',
        MODAL_SUCCESS_CONTAINER_CLASS = 'cpts-success-modal',
        MODAL_WARN_CONTAINER_CLASS = 'cpts-warn-modal',
        
        SPECIAL_MODAL_TITLE = 'cpts-special-modal-title',
        SPECIAL_MODAL_CONTENT = 'cpts-special-modal_content';

  const MENU_CONTAINER_CLASS = 'cpts-menu',
        MENU_ITEM_CLASS = 'cpts-menu-item',
        MENU_SUBMENU_CLASS = 'cpts-menu-submenu',
        MENU_SUBMENU_TITLE_CLASS = 'cpts-menu-title',
        MENU_SUBMENU_TITLE_WRAP_CLASS = 'cpts-menu-title-wrapper',
        MENU_SUBMENU_ARROW_CLASS = 'cpts-menu-arrow',
        MENU_SUB_CLASS = 'cpts-menu-sub',

        // mode
        MENU_VERTICAL_CLASS = 'cpts-menu-vertical',
        MENU_HORIZONTAL_CLASS = 'cpts-menu-horizontal',

        // theme
        MENU_DARK_CLASS = 'cpts-menu-dark',
        MENU_LIGHT_CLASS = 'cpts-menu-light',

        // status
        MENU_DISABLED_CLASS = 'cpts-menu-disabled',
        MENU_HIDDEN_CLASS = 'cpts-menu-hidden',
        MENU_SUBMENU_OPEN_CLASS = 'cpts-menu-open',
        MENU_SUBMENU_CLOSE_CLASS = 'cpts-menu-close',
        MENU_SELECTED_ITEM_CLASS = 'cpts-menu-selected',
        MENU_SUBMENU_ACTIVE_CLASS = 'cpts-menu-submenu-active';



  return Object.freeze({
    /* Icon */
    ICON_CLASS, FILLED_ICON_CLASS, WARNING_ICON_CLASS, SUCCESS_ICON_CLASS, INFO_ICON_CLASS, ERROR_ICON_CLASS,
    CONFIRM_ICON_CLASS, CLOSE_ICON_CLASS, SPIN_ICON_CLASS, LOADING_ICON_CLASS,

    /* Button */
    DEFAULT_BTN_CLASS, GHOST_BTN_CLASS, PRIMARY_BTN_CLASS, DANGER_BTN_CLASS, DASHED_BTN_CLASS, LINK_BTN_CLASS,
    CIRCLE_BTN_CLASS, ROUND_BTN_CLASS, LARGE_BTN_CLASS, SMALL_BTN_CLASS, BLOCK_BTN_CLASS, WITHICON_BTN_CLASS,
    LOADING_BTN_CLASS,

    /* Tabs */
    TAB_ITEM_CLASS, TAB_ITEM_CLASS_ACTIVE, TAB_ITEM_CARD_CLASS, TAB_ITEM_WRAP_CLASS, TAB_ITEM_INNER_CLASS,
    TAB_ITEM_CARD_INNER_CALSS, TAB_ITEM_CONTAINER_CLASS, TAB_ITEM_CONTAINER_WITH_ARROW_CLASS, PANE_ITEM_CLASS,
    PANE_ITEM_CLASS_ACTIVE, PANE_ITEM_WRAP_CLASS, TAB_ARROW_CLASS, TAB_ARROW_CLASS_DISABLE, TAB_ARROW_CLASS_INVISIBLE,
    TAB_PREVIOUS_ARROW_CLASS, TAB_NEXT_ARROW_CLASS, TAB_CONTAINER_CLASS, UNDERLINE_CLASS,

    /* Pagination */
    PAGINATION_ITEM_CLASS, PAGINATION_ITEM_CLASS_ACTIVE, PAGINATION_ITEM_CLASS_BORDER, PAGINATION_ITEM_CLASS_DISABLE,
    PAGINATION_ITEM_CLASS_PREV, PAGINATION_ITEM_CLASS_NEXT, PAGINATION_CONTAINER_CLASS, PAGINATION_ITEM_MORE_CLASS,
    PAGINATION_ITEM_NEXT_MORE_CLASS, PAGINATION_ITEM_PREV_MORE_CLASS,

    /* Message */
    MESSAGE_TEXTCLASS, MESSAGE_CONTAINERCLASS, MESSAGE_ICONCLASS,

    /* Gallery */
    GALLERY_BUTTON_NEXT_CLASS, GALLERY_BUTTON_PREV_CLASS, GALLERY_PAGINATION_CLASS, GALLERY_SWIPER_CONTAINER_CLASS,
    GALLERY_WRAPPER_CLASS, GALLERY_CONTAINER_CLASS, GALLERY_CONTAINER_CLASS_HIDDEN,

    /* CardList */
    CARD_LIST_ITEM_INNER_CLASS, CARD_LIST_ITEM_CLASS,

    /* Alert */
    ALERT_MESSAGE_CLASS ,ALERT_DESCRIPTION_CLASS, ALERT_ICON_CLASS, ALERT_CLOSE_ICON, ALERT_WARN_CLASS,
    ALERT_SUCCESS_CLASS, ALERT_ERROR_CLASS, ALERT_INFO_CLASS, ALERT_CONTAINER_CLASS, ALERT_WITH_ICON_CLASS,
    ALERT_WITH_DESC_CLASS, ALERT_WITH_CLOSE_CLASS, ALERT_INVISIBLE_CLASS, ALERT_SLIDEUP_CLASS,
    ALERT_SLIDEDOWN_CLASS,

    /* Modal */
    MODAL_FOOTER_CONTAINER_CLASS, MODAL_FOOTER_WRAP_CLASS, MODAL_FOOTER_OK_BTN_CLASS, MODAL_FOOTER_CANCEL_BTN_CLASS,
    MODAL_HEADER_CONTAINER_CLASS, MODAL_HEADER_WRAP_CLASS, MODAL_CLOSE_ICON_CLASS, MODAL_BODY_CLASS,
    MODAL_CONTAINER_CLASS, MODAL_CONTAINER_CENTERED_CLASS, MODAL_CONTAINER_INVISIBLE_CLASS,
    MODAL_MASK_CLASS, MODAL_MASK_INVISIBLE_CLASS,
    // for Modal info/error/success/warn/confirm
    MODAL_CONFIRM_CONTAINER_CLASS, MODAL_INFO_CONTAINER_CLASS, MODAL_ERROR_CONTAINER_CLASS,MODAL_SUCCESS_CONTAINER_CLASS, MODAL_WARN_CONTAINER_CLASS, SPECIAL_MODAL_TITLE, SPECIAL_MODAL_CONTENT,

    // menu
    MENU_CONTAINER_CLASS , MENU_ITEM_CLASS, MENU_SUBMENU_CLASS, MENU_VERTICAL_CLASS,
    MENU_HORIZONTAL_CLASS, MENU_DARK_CLASS, MENU_LIGHT_CLASS, MENU_DISABLED_CLASS,
    MENU_SUBMENU_TITLE_CLASS, MENU_SUBMENU_TITLE_WRAP_CLASS, MENU_SUBMENU_ARROW_CLASS,
    MENU_SUB_CLASS, MENU_HIDDEN_CLASS, MENU_SUBMENU_OPEN_CLASS, MENU_SUBMENU_CLOSE_CLASS, MENU_SUBMENU_ACTIVE_CLASS,
    MENU_SELECTED_ITEM_CLASS
  });
});