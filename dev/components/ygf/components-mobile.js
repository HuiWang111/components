;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory() : typeof define === 'function' && define.amd
  ? define(factory) : global.Color = factory();
}(this, function () {
  const PRIMARY_COLOR = '#1890ff';
  const DISABLE_COLOR = '#ccc';
  const WARNING_COLOR = '#faad14';

  return Object.freeze({
    PRIMARY_COLOR, DISABLE_COLOR, WARNING_COLOR
  });
});
;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.SVG = factory(global);
}(this, function (global) {
  const { 
    Color: { PRIMARY_COLOR },
    util: { isString }
  } = global;

  const getPrevSvg = (color) => {
    const fill = isString(color) ? ` fill="${color}"` : '';
    return `<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"${fill}></path></svg>`;
  }
  const getNextSvg = (color) => {
    const fill = isString(color) ? ` fill="${color}"` : ``;
    return `<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"${fill}></path></svg>`;
  }
  const getWarnSvg = (color = '#faad14') => (
    `<svg t="1560646481235" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1083" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M560 528C560 554.496 538.624 576 512 576l0 0C485.568 576 464 554.496 464 528l0-224C464 277.44 485.568 256 512 256l0 0c26.624 0 48 21.44 48 48L560 528zM560 720c0-26.496-21.376-48-48-48-26.432 0-48 21.504-48 48S485.568 768 512 768C538.624 768 560 746.496 560 720zM512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 896.768c-212.48 0-384.768-172.224-384.768-384.768S299.52 127.232 512 127.232 896.64 299.52 896.64 512 724.48 896.768 512 896.768z" fill="${color}" p-id="1084"></path></svg>`
  );
  const getWarnFilledSvg = (color = '#faad14') => (
    `<svg t="1560646462555" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="967" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 768c-26.432 0-48-21.504-48-48S485.568 672 512 672c26.624 0 48 21.504 48 48S538.624 768 512 768zM560 528C560 554.56 538.624 576 512 576 485.568 576 464 554.56 464 528l0-224C464 277.44 485.568 256 512 256c26.624 0 48 21.44 48 48L560 528z" fill="${color}" p-id="968"></path></svg>`
  );
  const getSuccessSvg = (color = '#52c41a') => (
    `<svg t="1560648151229" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1026" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M530.305 957.452C283.818 968.12 75.361 776.97 64.692 530.483c-10.67-246.476 180.486-454.93 426.953-465.6 246.489-10.67 454.924 180.484 465.614 426.959 10.668 246.465-180.486 454.94-426.954 465.61z m-36.63-845.591c-220.526 9.553-391.56 196.061-382.007 416.584 9.553 220.532 196.064 391.564 416.608 382.03 220.528-9.574 391.56-196.06 382.004-416.604-9.551-220.523-196.06-391.554-416.606-382.01z m-14.687 582.005v0.022l-21.602 21.925c-5.964 6.066-15.742 6.188-21.846 0.264l-22.069-21.44v-0.02L278.34 543.941c-6.085-5.922-6.206-15.628-0.243-21.682l21.602-21.947c5.963-6.065 15.76-6.167 21.845-0.254L445.6 640.035l248.374-273.088c5.966-6.065 15.74-6.165 21.847-0.253l22.067 21.43c6.107 5.923 6.208 15.628 0.245 21.693l-259.145 284.05z" fill="${color}" p-id="1027"></path></svg>`
  );
  const getSuccessFilledSvg = (color = '#52c41a') => (
    `<svg t="1560648134097" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="904" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.998465 66.320475c-245.76131 0-444.98777 199.22646-444.98777 444.98777 0 245.750053 199.22646 444.979584 444.98777 444.979584 245.762333 0 444.988794-199.228507 444.988794-444.979584C956.987259 265.546935 757.760798 66.320475 511.998465 66.320475L511.998465 66.320475zM787.323091 400.624377l-298.918997 298.907741c-2.929726 2.932796-8.197706 7.458879-8.197706 7.458879s-4.611018 5.345752-7.54279 8.277524l-15.727193 15.72617c-8.689916 8.689916-22.774703 8.689916-31.467689 0L236.678956 542.207999c-8.691963-8.689916-8.691963-22.774703 0-31.457456l15.730263-15.730263c8.692986-8.686846 22.775726-8.686846 31.466666 0l157.325142 157.319002L740.127186 353.422332c8.686846-8.68173 22.775726-8.68173 31.462572 0l15.732309 15.739473C796.011984 377.844557 796.011984 391.935484 787.323091 400.624377L787.323091 400.624377zM787.323091 400.624377" fill="${color}" p-id="905"></path></svg>`
  );
  const getErrorSvg = (color = '#f5222d') => (
    `<svg t="1560649076559" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1387" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M516.461 20.457c-274.346 0-496.742 222.394-496.742 496.742s222.394 496.742 496.742 496.742 496.742-222.394 496.742-496.742-222.394-496.742-496.742-496.742zM516.461 964.278c-246.527 0-447.079-200.547-447.079-447.079s200.547-447.079 447.079-447.079 447.079 200.547 447.079 447.079-200.547 447.079-447.079 447.079z" fill="#f5222d" p-id="1388"></path><path d="M741.978 291.67c-12.099-12.117-31.79-12.117-43.905 0l-181.633 181.633-181.633-181.633c-12.102-12.117-31.795-12.117-43.905 0-12.117 12.102-12.117 31.79 0 43.905l181.633 181.633-181.633 181.633c-12.117 12.102-12.117 31.79 0 43.905 6.032 6.061 13.984 9.073 21.942 9.073 7.926 0 15.886-3.03 21.942-9.073l181.633-181.633 181.633 181.633c6.061 6.061 14.002 9.073 21.942 9.073s15.886-3.03 21.942-9.073c12.117-12.102 12.117-31.79 0-43.905l-181.669-181.633 181.633-181.633c12.117-12.102 12.117-31.79 0-43.905z" fill="${color}" p-id="1389"></path></svg>`
  );
  const getErrorFilledSvg = (color = '#f5222d') => (
    `<svg t="1560649069618" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1265" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462 0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102 447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499 12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997 9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924 0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z" fill="${color}" p-id="1266"></path></svg>`
  );
  const getInfoSvg = (color = PRIMARY_COLOR) => (
    `<svg t="1560649574256" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1632" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M480 64A416.64 416.64 0 0 0 64 480 416.64 416.64 0 0 0 480 896 416.64 416.64 0 0 0 896 480 416.64 416.64 0 0 0 480 64z m0 64C674.752 128 832 285.248 832 480S674.752 832 480 832A351.552 351.552 0 0 1 128 480C128 285.248 285.248 128 480 128zM448 256v64h64V256z m0 128v320h64V384z" fill="${color}" p-id="1633"></path></svg>`
  );
  const getInfoFilledSvg = (color = PRIMARY_COLOR) => (
    `<svg t="1560649562228" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1510" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512s190.933333 426.666667 426.666667 426.666667 426.666667-190.933333 426.666667-426.666667S747.733333 85.333333 512 85.333333z m42.666667 640h-85.333334V469.333333h85.333334v256z m0-341.333333h-85.333334v-85.333333h85.333334v85.333333z" fill="${color}" p-id="1511"></path></svg>`
  );
  const getCloseSvg = (color) => (
    `<svg t="1560650069724" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="936" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" fill="${color}" p-id="937"></path></svg>`
  );
  const getLoadingSvg = (color) => (
    `<svg t="1561267146231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2830" width="200" height="200"><path d="M980.752 313.697c-25.789-60.972-62.702-115.725-109.713-162.736-47.012-47.011-101.764-83.924-162.736-109.713C645.161 14.542 578.106 1 509 1c-2.242 0-4.48 0.015-6.715 0.043-16.567 0.211-29.826 13.812-29.615 30.38 0.209 16.438 13.599 29.618 29.99 29.618l0.39-0.002c1.98-0.026 3.963-0.039 5.95-0.039 61.033 0 120.224 11.947 175.93 35.508 53.82 22.764 102.162 55.359 143.683 96.879s74.115 89.862 96.88 143.683C949.054 392.776 961 451.967 961 513c0 16.568 13.432 30 30 30s30-13.432 30-30c0-69.106-13.541-136.162-40.248-199.303z" p-id="2831" fill="${color}"></path></svg>`
  );
  const getEllipsisSvg = (color) => (
    `<svg t="1562392468332" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="200" height="200"><path d="M147.01175 430.890704c-44.791136 0-81.108273 36.303834-81.108273 81.109296 0 44.778856 36.316114 81.108273 81.108273 81.108273 44.792159 0 81.109296-36.329417 81.109296-81.108273C228.121046 467.194538 191.804932 430.890704 147.01175 430.890704zM511.999488 430.890704c-44.791136 0-81.108273 36.303834-81.108273 81.109296 0 44.778856 36.316114 81.108273 81.108273 81.108273 44.792159 0 81.109296-36.329417 81.109296-81.108273C593.108784 467.194538 556.791647 430.890704 511.999488 430.890704zM876.987227 430.890704c-44.791136 0-81.108273 36.303834-81.108273 81.109296 0 44.778856 36.316114 81.108273 81.108273 81.108273s81.108273-36.329417 81.108273-81.108273C958.094476 467.194538 921.778362 430.890704 876.987227 430.890704z" p-id="2648" fill="${color}"></path></svg>`
  );
  const getDoublePrevArrowSvg = (color) => (
    `<svg t="1562485665459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5641" width="200" height="200"><path d="M903.964073 994.632678c-151.216693-151.232949-302.444224-302.449643-453.662724-453.668143-15.992267-16.006717-15.992267-41.934997 0-57.92907 151.216693-151.231143 302.44603-302.449643 453.662724-453.668143 14.988009-15.000653 39.315979-15.000653 54.302182 0 15.000653 14.988009 15.000653 39.303336 0 54.303988-142.77623 142.778036-285.55246 285.543429-428.31424 428.321465 142.763586 142.779842 285.53801 285.557878 428.31424 428.335915 15.000653 14.988009 15.000653 39.301529 0 54.303988-14.988009 15.000653-39.314173 15.000653-54.302182 0z" fill="${color}" p-id="5642"></path><path d="M520.149662 994.632678a11936898.605923 11936898.605923 0 0 1-453.675367-453.668143c-15.992267-15.992267-15.992267-41.934997 0-57.92907C217.703632 331.818771 368.918519 180.585822 520.149662 29.369128c14.986203-15.000653 39.301529-15.000653 54.302182 0 15.002459 15.002459 15.002459 39.303336 0 54.303989A13680304.839723 13680304.839723 0 0 1 146.123155 511.992775l428.328689 428.335915c15.002459 15.002459 15.002459 39.315979 0 54.303988-15.000653 15.000653-39.315979 15.000653-54.302182 0z" fill="${color}" p-id="5643"></path></svg>`
  );
  const getDoubleNextArrowSvg = (color) => (
    `<svg t="1562486271213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5770" width="200" height="200"><path d="M503.862981 994.632678c151.216693-151.2185 302.444224-302.435193 453.660918-453.668143 15.994073-15.992267 15.994073-41.934997 0-57.92907L503.862981 29.367322c-15.000653-15.000653-39.315979-15.000653-54.303988 0-15.002459 15.002459-15.002459 39.303336 0 54.303988 142.763586 142.778036 285.539816 285.556072 428.316046 428.321465-142.774424 142.779842-285.55246 285.557878-428.316046 428.335915-15.002459 15.002459-15.002459 39.315979 0 54.303988 14.988009 15.000653 39.303336 15.000653 54.303988 0z" fill="${color}" p-id="5771"></path><path d="M120.050377 994.632678c151.216693-151.232949 302.429774-302.449643 453.660917-453.668143 15.994073-16.006717 15.994073-41.934997 0-57.92907L120.050377 29.367322c-15.002459-15.000653-39.315979-15.000653-54.318438 0-14.988009 14.988009-14.988009 39.303336 0 54.303988 142.77623 142.778036 285.554266 285.543429 428.328689 428.321465-142.774424 142.779842-285.55246 285.557878-428.328689 428.335915-14.988009 14.988009-14.988009 39.301529 0 54.303988 15.002459 15.000653 39.315979 15.000653 54.318438 0z" fill="${color}" p-id="5772"></path></svg>`
  );
  const getFilledConfirmSvg = (color) => (
    `<svg t="1562558077535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6573" width="200" height="200"><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m32 704h-64v-64h64v64z m11.2-203.2l-5.6 4.8c-3.2 2.4-5.6 8-5.6 12.8v58.4h-64v-58.4c0-24.8 11.2-48 29.6-63.2l5.6-4.8c56-44.8 83.2-68 83.2-108C598.4 358.4 560 320 512 320c-49.6 0-86.4 36.8-86.4 86.4h-64C361.6 322.4 428 256 512 256c83.2 0 150.4 67.2 150.4 150.4 0 72.8-49.6 112.8-107.2 158.4z" fill="${color}" p-id="6574"></path></svg>`
  );
  const getConfirmSvg = (color) => (
    `<svg t="1562558170969" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6701" width="200" height="200"><path d="M512 128c212 0 384 172 384 384s-172 384-384 384-384-172-384-384 172-384 384-384m0-64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m32 704h-64v-64h64v64z m11.2-203.2l-5.6 4.8c-3.2 2.4-5.6 8-5.6 12.8v58.4h-64v-58.4c0-24.8 11.2-48 29.6-63.2l5.6-4.8c56-44.8 83.2-68 83.2-108C598.4 358.4 560 320 512 320c-49.6 0-86.4 36.8-86.4 86.4h-64C361.6 322.4 428 256 512 256c83.2 0 150.4 67.2 150.4 150.4 0 72.8-49.6 112.8-107.2 158.4z" fill="${color}" p-id="6702"></path></svg>`
  );

  return Object.freeze({
    getPrevSvg,
    getNextSvg,
    getWarnSvg,
    getWarnFilledSvg,
    getSuccessSvg,
    getSuccessFilledSvg,
    getErrorSvg,
    getErrorFilledSvg,
    getInfoSvg,
    getInfoFilledSvg,
    getCloseSvg,
    getLoadingSvg,
    getEllipsisSvg,
    getDoublePrevArrowSvg,
    getDoubleNextArrowSvg,
    getFilledConfirmSvg,
    getConfirmSvg
  });
});
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

        TAB_ITEM_CONTAINER_WRAP_CLASS = 'cpts-tabs-tab-container-wrapper',
        TAB_ITEM_EXTRA_CLASS = 'cpts-tabs-tabbar-extra',

        PANE_ITEM_CLASS = 'cpts-tabs-pane-item',
        PANE_ITEM_CLASS_ACTIVE = 'cpts-tabs-pane-item-active',
        PANE_ITEM_WRAP_CLASS = 'cpts-tabs-pane-wrapper',

        TAB_ARROW_CLASS = 'cpts-tabs-arrow',
        TAB_ARROW_CLASS_DISABLE = 'cpts-tabs-arrow-disable',
        TAB_ARROW_CLASS_INVISIBLE = 'cpts-tabs-arrow-invisible',
        TAB_PREVIOUS_ARROW_CLASS = 'cpts-tabs-prev-arrow',
        TAB_NEXT_ARROW_CLASS = 'cpts-tabs-next-arrow',

        TAB_CONTAINER_CLASS = 'cpts-tabs-container',
        TAB_ANIMATE_CLASS = 'cpts-tabs-animate',

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
    TAB_ANIMATE_CLASS, TAB_ITEM_CONTAINER_WRAP_CLASS, TAB_ITEM_EXTRA_CLASS,

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
;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Gallery = factory(global);
}(this, function (global) {
  const { 
    Swiper, Component, jQuery: $,
    util: { 
      isNumber, toSelector, tagOf, extend, toArray, toNumber, appendClass, getRandomClassName,
      propsChecker
    },
    ClassName: {
      GALLERY_BUTTON_NEXT_CLASS, GALLERY_BUTTON_PREV_CLASS, GALLERY_PAGINATION_CLASS, GALLERY_SWIPER_CONTAINER_CLASS,
      GALLERY_WRAPPER_CLASS, GALLERY_CONTAINER_CLASS, GALLERY_CONTAINER_CLASS_HIDDEN
    }
  } = global,
  
  isImgEl = function (el) {
    return tagOf(el) === 'img';
  };

  /**
   *  @param props: {
   *    navgation: true | false, // 是否需要导航箭头
   *    pagination: true | false, // 是否需要分页器
   *    width: String | Number, // 百分比或者px, 移动端宽高通常使用默认的100%
   *    height: String | Number,
   *    bgColor: String,
   *    swiperProps: {}
   *  }
   */
  function Gallery(selector, props) {
    // propsChecker()

    // default
    const defaultProps = {
      navgation: false,
      pagination: true,
      width: '100%',
      height: '100%',
      bgColor: 'transparent',
      swiperProps: {}
    };

    const opts = extend({}, defaultProps, props);
    if ( (opts.width === '100%') && opts.navgation ) {
      opts.navgation = false; // 宽度100%时不使用导航箭头
    }

    this.props = opts;
    this.$source = $(selector);

    // 为每个实例容器创建一个随机className
    const RANDOM_CLASS = getRandomClassName();
    this.RANDOM_CLASS = RANDOM_CLASS;

    this.super();

  };

  $.inherit(Component, Gallery);

  extend(Gallery.prototype, {
    componentWillMount () {
      // handle swiper props
      this.swiperPropsHandler();
    },

    render: function () {
      const srcList = this.createSrcList();
      const { RANDOM_CLASS, props: { pagination, navgation } } = this;
      
      const slideList = srcList.map(function (src) {
        const img = $.closingNode('img', null, { src });
        return $.node('div', img, 'swiper-slide', );
      });
  
      let swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
      if (pagination) {
        swiperWrapper += $.node('div', '', appendClass(GALLERY_PAGINATION_CLASS, 'swiper-pagination'));
      }
  
      let swiperContainer = $.node('div', swiperWrapper, appendClass(GALLERY_SWIPER_CONTAINER_CLASS, 'swiper-container'));
      if (navgation) {
        const prevBtn = $.node('div', '', appendClass(GALLERY_BUTTON_PREV_CLASS, 'swiper-button-prev'));
        const nextBtn = $.node('div', '', appendClass(GALLERY_BUTTON_NEXT_CLASS, 'swiper-button-next'));
        swiperContainer += (prevBtn + nextBtn);
      }
  
      const galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);
  
      const galleryContainer = $.node('section', galleryWrappper, appendClass(
        GALLERY_CONTAINER_CLASS,
        GALLERY_CONTAINER_CLASS_HIDDEN, RANDOM_CLASS
      ));
      
      return [{
        html: galleryContainer,
        container: 'body'
      }];
    },

    componentDidMount () {
      this.$container = $(toSelector(this.RANDOM_CLASS));
    },

    style: function () {
      const maxZIndex = this.getMaxZIndex();
      let { width, height, bgColor, navgation } = this.props;
      const $container = this.$container;

      // 设置gallery元素的z-index为当前页面z-index最大值+1
      $container.css({
        'z-index': maxZIndex === null ? 'auto' : maxZIndex + 1
      });
  
      // 设置swiper容器宽高
      const containerWidth = $container.width();
      const percentReg = /%$/;
      let widthValue = percentReg.test(width) ? containerWidth*(parseFloat(width)/100) : parseFloat(width);
      
      if (widthValue > containerWidth) {
        width = '100%';
        widthValue = containerWidth;
      }
      const diff = containerWidth - widthValue;
      const wider = diff > 0 ? (diff > 100 ? 100 : wider) : 0;
      
      width = isNumber(width) ? `${width}px` : width;
      height =  isNumber(height) ? `${height}px` : height;
  
      const $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
      $galleryWrapper.css({
        'width': navgation ? (percentReg.test(width) ? `${widthValue + wider}px` : `${parseFloat(width) + wider}px`) : width,
        'height': height
      });
      $galleryWrapper.find(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)).css({
        'width': width,
        'height': height
      });
  
      // 设置gallery容器宽高，默认透明背景
      $container.css({
        backgroundColor: bgColor
      });
    },

    bindEvents () {
      const { RANDOM_CLASS, $container, $source, props: { swiperProps } } = this;
  
      // 点击初始化gallery swiper
      const GALLERY = this;
      GALLERY.$swiper = null;
      $source.on('click', function () {
        const target = this;
        const index = $source.indexOf(target);
  
        if (!GALLERY.$swiper) {
          (index > 0) && (swiperProps.initialSlide = index);
          GALLERY.$swiper = new Swiper(appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperProps);
        } else {
          GALLERY.$swiper.slideTo(index, 0, false);
        }
  
        $container.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      });
  
      // 隐藏gallery容器
      const close = function () {
        $container.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      }
      $container.on('click', close);
  
      const stopPropagation = function (e) {
        e.stopPropagation();
      }
      $container.find(toSelector(GALLERY_WRAPPER_CLASS)).on('click', stopPropagation);
    },

    createSrcList: function () {
      let eleList = toArray(this.$source);

      //获取【自身为img元素或者子元素中包含img元素, 并且img元素包含src props】的元素
      eleList = eleList.filter(function (item) {
        const isImg = isImgEl(item);
        const $img = !isImg ? $(item).find('img') : null;
        return (isImg && item.src) || ($img && $img.length > 0 && $img[0].src);
      });

      //生成img元素的src列表
      const srcList  = eleList.map(function (item) {
        return item.src || $(item).find('img')[0].src;
      });
  
      return srcList;
    },

    getMaxZIndex () {
      // 获取当前页面最大的z-index值
      const $hasZIndex = $('*').filter(function (_, item) {
        const zIndex = toNumber($(item).css('z-index'));
        return zIndex !== false && zIndex > 0;
      });
      const maxZIndex = $hasZIndex.length === 0 ? null : $hasZIndex.reduce(function (max, item) {
        const zIndex = parseFloat($(item).css('z-index'));
        return zIndex > max ? zIndex : max;
      }, -1000000);

      return maxZIndex;
    },

    swiperPropsHandler: function () {
      const { RANDOM_CLASS, props: { swiperProps, pagination, navgation } } = this;
  
      if (swiperProps.pagination) delete swiperProps.pagination;
      if (swiperProps.nextButton) delete swiperProps.nextButton;
      if (swiperProps.prevButton) delete swiperProps.prevButton;
  
      if (pagination) swiperProps.pagination = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_PAGINATION_CLASS));
      if (navgation) {
        swiperProps.nextButton = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_BUTTON_NEXT_CLASS));
        swiperProps.prevButton = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_BUTTON_PREV_CLASS));
      }

      swiperProps.observer = true;
      swiperProps.observeParents = true;

      this.props.swiperProps = swiperProps;
    }
  });

  return Gallery;
});
;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Pagination = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isFunction, toSelector, extend, removeKeys, appendClass,
      getRandomClassName, propsChecker
    },
    ClassName: {
      PAGINATION_ITEM_CLASS, PAGINATION_ITEM_CLASS_ACTIVE, PAGINATION_ITEM_CLASS_BORDER, PAGINATION_ITEM_CLASS_DISABLE,
      PAGINATION_ITEM_CLASS_PREV, PAGINATION_ITEM_CLASS_NEXT, PAGINATION_CONTAINER_CLASS, PAGINATION_ITEM_MORE_CLASS,
      PAGINATION_ITEM_NEXT_MORE_CLASS, PAGINATION_ITEM_PREV_MORE_CLASS
    },
    SVG: { getPrevSvg, getNextSvg, getEllipsisSvg, getDoublePrevArrowSvg, getDoubleNextArrowSvg },
    Color: { DISABLE_COLOR, PRIMARY_COLOR }
  } = global,
  
  MAX_DISPLAY_TOTAL = 9, LEFTMODEINDEXMAP = [2, 3, 4, 5, 6], INDEXMAP = [1, 2, 3, 4, 5],
  
  prevSvg = getPrevSvg(),
  nextSvg = getNextSvg(),
  prevSvgDisable = getPrevSvg(DISABLE_COLOR),
  nextSvgDisable = getNextSvg(DISABLE_COLOR);
  
  /**
   *  @param props: {
   *    total: Numer,
   *    pageSize: Number,
   *    current: Number,
   *    bordered: true | false, // 页码是否需要边框
   *    onChange: Function (current),
   *    itemRender: Function (current, type, originalElement)
   *  }
   */
  function Pagination(selector, props) {
    propsChecker(props, {
      total: 'number.require',
      pageSize: 'number',
      current: 'number',
      bordered: 'boolean',
      onChange: 'function',
      itemRender: 'function'
    });

    // default
    const defaultProps = {
      pageSize: 10,
      current: 1,
      bordered: true,
    };

    this.props = extend({}, defaultProps, props);
    if (!this.props.total) return;

    this.selector = selector;
    this.RANDOM_CLASS = getRandomClassName();

    this.super();
  };

  $.inherit(Component, Pagination);

  extend(Pagination.prototype, {
    render () {
      const { selector, RANDOM_CLASS, props: { current, total, pageSize } } = this;

      const totalPage = Math.ceil(total/pageSize);
      Object.defineProperty(this, 'totalPage', {
        writable: false,
        configurable: true,
        enumerable: false,
        value: totalPage
      });

      // pagination
      let i, ulInner = '';
      if (totalPage <= MAX_DISPLAY_TOTAL) {
        for (i = 1; i <= totalPage; i++) {
          const pagination = this.createPagination(i, i === current);
          ulInner += pagination;
        }
      } else {
        const prevMore = this.createMore('prev');
        const nextMore = this.createMore('next');
        const first = this.createPagination(1);
        const last = this.createPagination(totalPage);
        
        if (current < 8) {
          for (i = 1; i < 8; i++) {
            const pagination = this.createPagination(i, i === current);
            ulInner += pagination;
          }

          ulInner += nextMore + last;

          this.currentMode = 'left';
        } else if ( current > (totalPage - 6) ) {
          ulInner += first + prevMore;

          for (i = totalPage - 6; i < totalPage + 1; i++ ) {
            const pagination = this.createPagination(i, i === current);
            ulInner += pagination;
          }

          this.currentMode = 'right';
        } else {
          ulInner += first + prevMore;

          for (i = current - 2; i < current + 3; i++) {
            const pagination = this.createPagination(i, i === current);
            ulInner += pagination;
          }
          
          ulInner += nextMore + last;

          this.currentMode = 'symmetrical';
        }
      }

      //previous
      const prevItem = this.createPrevious();

      //next
      const nextItem = this.createNext();

      const klass = appendClass(
        RANDOM_CLASS,
        PAGINATION_CONTAINER_CLASS
      );

      return [{
        html: $.node('ul', prevItem + ulInner + nextItem, klass),
        container: $(selector),
        type: 'append'
      }];
    },

    componentDidMount () {
      this.$container = $(toSelector(this.RANDOM_CLASS));

      this.$next = this.$container.find(toSelector(PAGINATION_ITEM_CLASS_NEXT));
      this.$prev = this.$container.find(toSelector(PAGINATION_ITEM_CLASS_PREV));
    },

    bindEvents () {
      const { $next, $prev, $container } = this;
      const __this__ = this;

      // click previous button
      $prev.on('click', function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
          const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          const current = __this__.getPage($active);
          const index = current - 1;
          
          __this__.toggleMode(index);
          __this__.handlePaginationChange(current, index);
        }
      });

      // click next button
      $next.on('click', function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
          const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          const current = __this__.getPage($active);
          const index = current + 1;

          __this__.toggleMode(index);
          __this__.handlePaginationChange(current, index);
        }
      });

      // click paginations
      $container.on('click', `${toSelector(PAGINATION_ITEM_CLASS)}`, function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_ACTIVE)) {
          const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          const current = __this__.getPage($active);
          const index = __this__.getPage($this);

          if (current !== index) {
            __this__.toggleMode(index);
            __this__.handlePaginationChange(current, index);
          }
        }
      });

      // click more
      const moreSelector = `${toSelector(PAGINATION_ITEM_NEXT_MORE_CLASS)},${toSelector(PAGINATION_ITEM_PREV_MORE_CLASS)}`;
      $container.on('click', moreSelector, function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
        const current = __this__.getPage($active);
        const variable = $this.hasClass(PAGINATION_ITEM_PREV_MORE_CLASS) ? -5 : 5;
        const index = current + variable;

        __this__.toggleMode(index);
        __this__.handlePaginationChange(current, index);
      });
    },

    createPagination (page, isActive) {

      const { bordered, itemRender } = this.props;

      const klass = appendClass(
        PAGINATION_ITEM_CLASS,
        isActive ? PAGINATION_ITEM_CLASS_ACTIVE : '',
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      const originalElement = $.node('a', page);
      const element = isFunction(itemRender) ? itemRender(page, 'pagination', originalElement) : originalElement;
      
      const pagination = $.node('li', element, klass, {
        title: page
      });

      return pagination;
    },

    createPrevious () {
      const { current, itemRender, bordered } = this.props;
      const isDisable = current === 1;
      
      const klass = appendClass(
        PAGINATION_ITEM_CLASS_PREV,
        isDisable ? PAGINATION_ITEM_CLASS_DISABLE : '',
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      const svg = isDisable ? prevSvgDisable : prevSvg;
      const originalElement = $.node('a', svg);
      const element = isFunction(itemRender) ? (
        itemRender(null, 'prev', originalElement)
      ) : originalElement;
      this.isPrevOriginal = element === originalElement;

      return $.node('li', element, klass, {
        title: '上一页'
      });
    },

    createNext () {
      const { props: { current, itemRender, bordered }, totalPage } = this;
      const isDisable = current === totalPage;

      const klass = appendClass(
        PAGINATION_ITEM_CLASS_NEXT,
        isDisable ? PAGINATION_ITEM_CLASS_DISABLE : '',
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      const svg = current === totalPage ? nextSvgDisable : nextSvg;
      const originalElement = $.node('a', svg);

      const element = isFunction(itemRender) ? (
        itemRender(null, 'next', originalElement)
      ) : originalElement;
      this.isNextOriginal = element === originalElement;

      return $.node('li', element, klass, {
        title: '下一页'
      });
    },

    createMore (type) {
      const isPrev = type === 'prev';

      const klass = appendClass(
        PAGINATION_ITEM_MORE_CLASS,
        isPrev ? PAGINATION_ITEM_PREV_MORE_CLASS : PAGINATION_ITEM_NEXT_MORE_CLASS
      );

      const svg = getEllipsisSvg('#aaaaaa');
      const hoverSvg = isPrev ? getDoublePrevArrowSvg(PRIMARY_COLOR) : getDoubleNextArrowSvg(PRIMARY_COLOR);
      const element = $.node('a', svg + hoverSvg);

      return $.node('li', element, klass, {
        title: isPrev ? '向前跳5页' : '向后跳5页'
      });
    },

    getPage ($el) {
      return parseInt($el.attr('title'));
    },

    handlePaginationChange (current, index) {
      const { 
        totalPage, $container, $prev, $next, isPrevOriginal, isNextOriginal, currentMode,
        props: { onChange }
      } = this;
      const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));

      if (currentMode === 'symmetrical') {
        [1, 2, 3, 4, 5].forEach(i => {
          const page = index + (i - 3);
          $pagination.eq(i).children('a').text(page);
          $pagination.eq(i).attr('title', page);
        });
      } else {
        this.filterByTitle($pagination, current).removeClass(PAGINATION_ITEM_CLASS_ACTIVE);
        this.filterByTitle($pagination, index).addClass(PAGINATION_ITEM_CLASS_ACTIVE);

        if ( (index !== totalPage) && ($next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isNextOriginal && $next.children('a').html(nextSvg);
          $next.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
        if ( (index === totalPage) && (!$next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isNextOriginal && $next.children('a').html(nextSvgDisable);
          $next.addClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
        if ( (index === 1) && (!$prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isPrevOriginal && $prev.children('a').html(prevSvgDisable);
          $prev.addClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
        if ( (index !== 1) && ($prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isPrevOriginal && $prev.children('a').html(prevSvg);
          $prev.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
      }

      this.props.current = index;
      isFunction(onChange) && onChange(index);
    },

    filterByTitle ($el, page) {
      const __this__ = this;
      return $el.filter(function () {
        return __this__.getPage($(this)) === page;
      });
    },

    toggleMode (index) {
      const { totalPage, currentMode, $container } = this;
      const willMode = index < 8 ? 'left' : (
        index > totalPage - 7 ? 'right' : 'symmetrical'
      );
      
      if (currentMode === willMode) return;

      const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
      const $prevMore = $container.find(toSelector(PAGINATION_ITEM_PREV_MORE_CLASS));
      const $nextMore = $container.find(toSelector(PAGINATION_ITEM_NEXT_MORE_CLASS));
      
      if (currentMode === 'left') {

        if (willMode === 'symmetrical') {
          this.paginationToMore($pagination, 'prev');
          LEFTMODEINDEXMAP.forEach(i => {
            // 索引2, 3, 4, 5, 6分别对应6, 7, 8, 9, 10
            const page = index + (i - 4);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        } else if (willMode === 'right') {
          this.paginationToMore($pagination, 'prev');
          this.moreToPagination($nextMore, 'next');
          LEFTMODEINDEXMAP.forEach(i => {
            // 索引2, 3, 4, 5, 6分别对应totalPage -6, -5, -4, -3, -2
            const page = (totalPage - 4) + (i - 4);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        }

      } else if (currentMode === 'symmetrical') {

        if (willMode === 'left') {
          this.moreToPagination($prevMore, 'prev');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应3, 4, 5, 6, 7
            const page = i + 2;
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        } else if (willMode === 'right') {
          this.moreToPagination($nextMore, 'next');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应totalPage -6, -5, -4, -3, -2
            const page = (totalPage - 4) + (i - 3);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        }

      } else if (currentMode === 'right') {

        if (willMode === 'symmetrical') {
          this.paginationToMore($pagination, 'next');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应totalPage -7, -6, -5, -4, -3
            const page = index + (i - 3);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        } else if (willMode === 'left') {
          this.moreToPagination($prevMore, 'prev');
          this.paginationToMore($pagination, 'next');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应3, 4, 5, 6, 7
            const page = i + 2;
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        }

      }

      $pagination
        .filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE))
        .removeClass(PAGINATION_ITEM_CLASS_ACTIVE);

      this
        .filterByTitle($container.find(toSelector(PAGINATION_ITEM_CLASS)), index)
        .addClass(PAGINATION_ITEM_CLASS_ACTIVE);
        
      this.currentMode = willMode;
    },

    paginationToMore ($pagination, type) {
      const { totalPage } = this;
      const svg = getEllipsisSvg('#aaaaaa');
      const isPrev = type === 'prev';
      const page = isPrev ? 2 :  totalPage - 1;
      const $currentPage = this.filterByTitle($pagination, page);
      const hoverSvg = isPrev ? getDoublePrevArrowSvg(PRIMARY_COLOR) : getDoubleNextArrowSvg(PRIMARY_COLOR);

      $currentPage.children('a').html(svg + hoverSvg);

      const klass = appendClass(
        PAGINATION_ITEM_MORE_CLASS,
        isPrev ? PAGINATION_ITEM_PREV_MORE_CLASS : PAGINATION_ITEM_NEXT_MORE_CLASS
      );
      
      $currentPage.attr('class', klass).attr('title', isPrev ? '向前跳5页' : '向后跳5页');
    },

    moreToPagination ($more, type) {
      const { totalPage, props: { bordered } } = this;
      const isPrev = type === 'prev';
      const page = isPrev ? 2 :  totalPage - 1;
      const $anchor = $more.children('a');

      $anchor.text(page);

      const klass = appendClass(
        PAGINATION_ITEM_CLASS,
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      $more.attr('class', klass).attr('title', page);
    },

    destroy () {
      removeKeys(this, 'selector');
    }
  });

  return Pagination;
});
;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Tabs = factory(global);
}(this, function (global) {
  const {
    Component, jQuery: $,
    util: { 
      isFunction, isUndefined, isNil, toSelector, extend, removeKeys, appendClass,
      propsChecker, debounce, isEmpty
    },
    ClassName: {
      TAB_ITEM_CLASS, TAB_ITEM_CLASS_ACTIVE, TAB_ITEM_CARD_CLASS, TAB_ITEM_WRAP_CLASS, TAB_ITEM_INNER_CLASS,
      TAB_ITEM_CARD_INNER_CALSS, TAB_ITEM_CONTAINER_CLASS, TAB_ITEM_CONTAINER_WITH_ARROW_CLASS, PANE_ITEM_CLASS,
      PANE_ITEM_CLASS_ACTIVE, PANE_ITEM_WRAP_CLASS, TAB_ARROW_CLASS, TAB_ARROW_CLASS_DISABLE, TAB_ARROW_CLASS_INVISIBLE, TAB_PREVIOUS_ARROW_CLASS, TAB_NEXT_ARROW_CLASS, TAB_CONTAINER_CLASS, UNDERLINE_CLASS, TAB_ANIMATE_CLASS, TAB_ITEM_CONTAINER_WRAP_CLASS, TAB_ITEM_EXTRA_CLASS,

      /* Icon */
      CLOSE_ICON_CLASS
    },
    Color: { DISABLE_COLOR },
    SVG: { getPrevSvg, getNextSvg }
  } = global,
  
  prevSvg = getPrevSvg(),
  nextSvg = getNextSvg()
  prevSvgDisable = getPrevSvg(DISABLE_COLOR),
  nextSvgDisable = getNextSvg(DISABLE_COLOR),
  
  TAB_ITEM_GAP = 32;
  
  /**
   *  @param props: {
   *    type: 'line' | 'card', // default is 'line' 
   *    tabPanes: Array, // => [{tab: String, key: String, forceRender: Boolen}]
   *    defaultKey: String,
   *    editable: Boolean, // 仅type='card'时有效
   *    animated: true,
   *    tabBarExtraContent: string,
   *    block: Boolean, // 宽度自适应父元素，设置此配置为true还会额外监听window.resize事件
   *    insertElementJQueryFunc: string, // 将元素插入到文档的jQuery方法
   *    onChange: Function(index),
   *    renderPaneItem: Function(tabName, index)
   *  }
   * 
   *  bug:
   *  type为card时的active tab下方应该没有下划线，有待优化
   *  在关闭一个tab后切换tab时pane会出现位置错乱，有待优化
   */

  function Tabs(selector, props) {
    propsChecker(props, {
      type: 'string',
      tabPanes: 'array.require',
      editable: 'boolean',
      animated: 'boolean',
      block: 'boolean',
      insertElementJQueryFunc: 'string',
      tabBarExtraContent: 'string',
      onChange: 'function',
      renderPaneItem: 'function'
    });

    this.$container = $(selector);
    if (this.$container.length < 1) throw new Error(`not found ${selector} Element`);

    const { type } = props;
    if (!isUndefined(type) && !['line', 'card'].includes(type)) {
      throw new Error(`${type} is not a correct tabs type`);
    }

    //default
    const defaultKey = props.tabPanes[0].key;
    const defaultProps = {
      type: 'line',
      tabPanes: [],
      defaultKey,
      editable: false,
      animated: true,
      block: false,
      insertElementJQueryFunc: 'html',
      onChange: null,
      renderPaneItem: null
    };

    this.props = extend({}, defaultProps, props);
    this.super();
  };

  $.inherit(Component, Tabs);

  extend(Tabs.prototype, {
    render () {
      const { 
        $container,
        props: { tabPanes, renderPaneItem, defaultKey, type, editable, insertElementJQueryFunc, animated }
      } = this;

      let tabsDOM = '', panesDOM = '', isDefaultFirst = false, isDefaultLast = false;
      const unRenderPanes = {}, isRenderedRecords = {}, panesCount = tabPanes.length;
      const isEditableCard = type === 'card' && editable;

      tabPanes.forEach((pane, index) => {
        const { tab, key } = pane;
        let { forceRender } = pane;

        isNil(forceRender) && (forceRender = true);

        const isActive = key === defaultKey;

        if (isActive && index === 0) isDefaultFirst = true;
        if (isActive && index === panesCount) isDefaultLast = true;
        
        // tab
        const klass = appendClass(
          TAB_ITEM_CLASS,
          isActive ? TAB_ITEM_CLASS_ACTIVE : '',
          type === 'card' ? TAB_ITEM_CARD_CLASS : ''
        );
        const closeIcon = isEditableCard ? (
          (new Icon('close')).html
        ) : '';

        let tabDOM = $.node('div', tab + closeIcon, klass);
        tabsDOM += tabDOM;
        
        // pane
        const paneClass = appendClass(
          PANE_ITEM_CLASS,
          isActive ? PANE_ITEM_CLASS_ACTIVE : ''
        );

        const paneInner = isFunction(renderPaneItem) ? renderPaneItem(tab, key) : '';

        let paneDOM;
        if (forceRender || isActive) {
          paneDOM = $.node('div', paneInner, paneClass);
          isRenderedRecords[key] = true;
        } else {
          paneDOM = $.node('div', '', paneClass);
          unRenderPanes[key] = paneInner;
          isRenderedRecords[key] = false;
        }
        
        panesDOM += paneDOM;
      });
      
      const underlineDOM = $.node('div', '', UNDERLINE_CLASS);
  
      const tabsInnerDOM = $.node('div', tabsDOM + underlineDOM, appendClass(
        TAB_ITEM_INNER_CLASS,
        type === 'card' ? TAB_ITEM_CARD_INNER_CALSS : ''
      ));
      const tabsWrapDOM = $.node('div', tabsInnerDOM, TAB_ITEM_WRAP_CLASS);
  
      const prevDOM = $.node('div', prevSvgDisable, appendClass(
        TAB_PREVIOUS_ARROW_CLASS,
        TAB_ARROW_CLASS,
        isDefaultFirst ? TAB_ARROW_CLASS_DISABLE : '',
        TAB_ARROW_CLASS_INVISIBLE
      ));
      const nextDOM = $.node('div', nextSvg, appendClass(
        TAB_NEXT_ARROW_CLASS,
        TAB_ARROW_CLASS,
        isDefaultLast ? TAB_ARROW_CLASS_DISABLE : '',
        TAB_ARROW_CLASS_INVISIBLE
      ));

      const tabsContainerDOM = this.getExtra(
        $.node('div', [prevDOM, tabsWrapDOM, nextDOM], appendClass(
          TAB_ITEM_CONTAINER_CLASS
        ))
      );

      const panesWrapDOM = $.node('div', panesDOM, appendClass(
        PANE_ITEM_WRAP_CLASS,
        animated ? TAB_ANIMATE_CLASS : ''
      ));

      this.unRenderPanes = unRenderPanes;
      this.isRenderedRecords = isRenderedRecords;
      
      return [{
        html: $.node('div', [tabsContainerDOM, panesWrapDOM], TAB_CONTAINER_CLASS),
        container: $container,
        type: insertElementJQueryFunc
      }];
    },

    componentDidMount () {
      const { $container, props: { tabPanes } } = this;

      // tab
      this.$tabContainer = $container.find(toSelector(TAB_ITEM_CONTAINER_CLASS));
      this.$tabWrap = this.$tabContainer.find(toSelector(TAB_ITEM_WRAP_CLASS));
      this.$tabInner = this.$tabWrap.find(toSelector(TAB_ITEM_INNER_CLASS));
      this.$tabItems = this.$tabInner.find(toSelector(TAB_ITEM_CLASS));
      this.$underline = this.$tabWrap.find(toSelector(UNDERLINE_CLASS));
      this.$arrow = $container.find(toSelector(TAB_ARROW_CLASS));

      // pane
      this.$paneWrap = $container.find(toSelector(PANE_ITEM_WRAP_CLASS));
      this.$panes = this.$paneWrap.find(toSelector(PANE_ITEM_CLASS));

      // attr
      this.containerWidth = $container.width();

      this.tabItemsWidthList = this.$tabItems.map((_, tabItem) => {
        return $(tabItem).outerWidth();
      });

      this.tabCount = tabPanes.length;
    },

    style () {
      const { containerWidth, $panes } = this;
      
      $panes.width(containerWidth + 'px');
      this.setPaneWrapWidth();
    },

    bindEvents () {
      const {
        $tabItems, $panes, $paneWrap, $container,
        props: { editable, block, animated }
      } = this;

      this.setUnderLineWidth(0);

      this.checkArrowVisibleStatus();
      
      const __this__ = this;

      //click tab item
      const { props: { type } } = this;

      $tabItems.on('click', function() {
        const $this = $(this);
        if ( !$this.hasClass(TAB_ITEM_CLASS_ACTIVE) ) {
          const $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
          const current = $tabItems.indexOf($active);
          const index = $tabItems.indexOf($this);

          __this__.handleTabChange(current, index);
        }
      });

      // close tab item by closeIcon
      const isEditableCard = type === 'card' && editable;
      isEditableCard && $tabItems.children(toSelector(CLOSE_ICON_CLASS)).on('click', function () {
        const $tabItem = $(this).parent();
        const current = $tabItems.indexOf($tabItem);
        const currentIsActive = $tabItem.hasClass(TAB_ITEM_CLASS_ACTIVE);

        const $nextItems = $tabItem.next();
        const $prevItems = $tabItem.prev();

        $tabItem.remove();
        $panes.eq(current).remove();

        if (currentIsActive) {
          if ($nextItems.length > 0) {
            __this__.handleTabChange(null, current, true);
          } else if ($prevItems.length > 0) {
            __this__.handleTabChange(null, current - 1, true);
          }
        }

        __this__.setPaneWrapWidth('sub');
        __this__.checkArrowVisibleStatus();
      });

      // resize
      if (block) {
        const debounced = debounce(function () {
          const newWidth = $container.width();

          const $tabItems = __this__.$tabItems;
          const $currentTab = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
          const index = $tabItems.indexOf($currentTab);
  
          $panes.width(newWidth);
          if (animated) {
            $paneWrap.width(newWidth * __this__.tabCount);
            $paneWrap.translateX(-(newWidth * index));
          }
          __this__.containerWidth = newWidth;
  
          __this__.checkArrowVisibleStatus();
        }, 200);
  
        window.addEventListener('resize', debounced);
      }
    },

    setUnderLineWidth (activeIndex) {
      const { $underline, tabItemsWidthList } = this;
      $underline.width(`${tabItemsWidthList[activeIndex]}px`);
    },

    /**
     * @action 'add' | 'sub' 表示增加或者减少tab
     */
    setPaneWrapWidth (action) {
      const { $paneWrap, containerWidth, props: { animated } } = this;

      if (!animated) return;

      if (action === 'add') {
        this.tabCount++;
      } else if (action === 'sub') {
        this.tabCount--;
      }
      $paneWrap.width(containerWidth * this.tabCount + 'px');
    },

    checkArrowVisibleStatus () {
      const { $arrow, $tabWrap, $tabInner, $tabContainer } = this;

      let wrapWidth = $tabWrap.width() + 60; // 加上左右两边各30的padding去计算更为准确
      const innerWidth = $tabInner.outerWidth();
      if (innerWidth > wrapWidth) { // 显示tab左右切换箭头
        $arrow.hasClass(TAB_ARROW_CLASS_INVISIBLE) && $arrow.removeClass(TAB_ARROW_CLASS_INVISIBLE);
        !$tabContainer.hasClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS) && $tabContainer.addClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS);

        wrapWidth = $tabWrap.width();
        this.bindArrowEvent(wrapWidth, innerWidth); // 绑定事件
      } else { // 隐藏左右切换箭头
        !$arrow.hasClass(TAB_ARROW_CLASS_INVISIBLE) && $arrow.addClass(TAB_ARROW_CLASS_INVISIBLE);
        $tabContainer.hasClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS) && $tabContainer.removeClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS);
      }
    },

    bindArrowEvent (wrapWidth, innerWidth) {
      const { $arrow, $tabInner } = this;
      let isMoving = false;
      const $next = $arrow.filter(toSelector(TAB_NEXT_ARROW_CLASS));
      const $prev = $arrow.filter(toSelector(TAB_PREVIOUS_ARROW_CLASS));
      let prevDistance = 0, nextDistance = innerWidth - wrapWidth;

      $next.off();
      $next.on('click', function () {
        const $this = $(this);

        if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE) && !isMoving) {
          isMoving = true;

          const innerWidth = $tabInner.outerWidth();
          const translateXValue = $tabInner.translateX();
          nextDistance = innerWidth - wrapWidth - Math.abs(translateXValue);

          $tabInner.translateX(() => {
            const distance = nextDistance < wrapWidth ? nextDistance : wrapWidth;
            prevDistance += distance;
            nextDistance -= distance;
            return translateXValue - distance;
          });

          if (nextDistance === 0) {
            $this.addClass(TAB_ARROW_CLASS_DISABLE);
            $this.html(nextSvgDisable);
          }
          
          if ($prev.hasClass(TAB_ARROW_CLASS_DISABLE)) {
            $prev.removeClass(TAB_ARROW_CLASS_DISABLE)
            $prev.html(prevSvg);
          }

          setTimeout(() => { isMoving = false; }, 500);
        }
      });

      $prev.off();
      $prev.on('click', function () {
        const $this = $(this);

        if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE) && !isMoving) {
          isMoving = true;

          const translateXValue = $tabInner.translateX();
          $tabInner.translateX(() => {
            const distance = prevDistance < wrapWidth ? prevDistance : wrapWidth;
            prevDistance -= distance;
            nextDistance += distance;
            return translateXValue + distance;
          });

          if (prevDistance === 0) {
            $this.addClass(TAB_ARROW_CLASS_DISABLE);
            $this.html(prevSvgDisable);
            // 计算精度误差导致了当prevDistance为0时tabInner的translateX值不为0，为了纠正精度误差，因此强制设为0
            $tabInner.translateX(0);
          }

          if ($next.hasClass(TAB_ARROW_CLASS_DISABLE)) {
            $next.removeClass(TAB_ARROW_CLASS_DISABLE);
            $next.html(nextSvg);
          }

          setTimeout(() => { isMoving = false; }, 500);
        }
      });
    },

    /**
     * @description static为true时不会改变pane和underline的translateX值
     */
    handleTabChange (current, index, isOnClose) {
      const { 
        unRenderPanes, isRenderedRecords, $underline, $paneWrap, $panes, containerWidth,
        props: { type, onChange, tabPanes, animated }
      } = this;
      let { $tabItems } = this;

      if (isOnClose) {
        $tabItems = this.$tabInner.find(toSelector(TAB_ITEM_CLASS));
        this.$tabItems = $tabItems;
      }

      // change tab active
      !isNil(current) && $tabItems.eq(current).removeClass(TAB_ITEM_CLASS_ACTIVE);
      $tabItems.eq(index).addClass(TAB_ITEM_CLASS_ACTIVE);

      // move underline
      if (type === 'line') {
        this.setUnderLineWidth(index);
        $underline.translateX(() => {
          let i, distance = 0;
          for (i = 0; i < index; i++) {
            distance += this.tabItemsWidthList[i] + TAB_ITEM_GAP;
          }
          return distance;
        });
      }

      // change pane
      animated && $paneWrap.translateX(-(containerWidth * index));
      !isNil(current) && $panes.eq(current).removeClass(PANE_ITEM_CLASS_ACTIVE);
      $panes.eq(index).addClass(PANE_ITEM_CLASS_ACTIVE);

      const { key } = tabPanes[index];

      /* 渲染未在初始化时渲染的pane */
      if (index < tabPanes.length) {
        if (!isRenderedRecords[key]) {
          $panes.eq(index).html(unRenderPanes[key]);
          isRenderedRecords[key] = true;
        }
      }

      isFunction(onChange) && onChange(key, index);
    },

    getExtra: function(html) {
      const { tabBarExtraContent } = this.props;
      if (isEmpty(tabBarExtraContent)) return html;

      const extra = $.node('div', tabBarExtraContent, TAB_ITEM_EXTRA_CLASS);

      return $.node('div', html + extra, TAB_ITEM_CONTAINER_WRAP_CLASS);
    },

    destroy () {
      removeKeys(this, 'isIncludePane, paneWidth');
    }
  });

  return Tabs;
});