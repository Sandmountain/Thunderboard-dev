export const viewsCount = (views) => {
  if (views > Math.pow(10, 6)) {
    let theViews = Math.floor(views / Math.pow(10, 6)).toString();
    return theViews + ' mn views';
  }
  if (views > Math.pow(10, 5)) {
    return views.substring(0, 3) + ' ' + views.substring(3, views.length) + ' views';
  }
  if (views > Math.pow(10, 4)) {
    return views.substring(0, 2) + ' ' + views.substring(2, views.length) + ' views';
  }
  if (views > Math.pow(10, 3)) {
    return views.substring(0, 1) + ' ' + views.substring(1, views.length) + ' views';
  }
  return views + ' views';
};
