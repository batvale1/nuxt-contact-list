export default function (context) {
  context.store.dispatch('auth/checkAuth', context.req);
  if (!context.store.getters['auth/isAuthenticated']) {
    context.redirect('/auth');
  }
}
