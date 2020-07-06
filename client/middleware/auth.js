export default function(context) {
  console.log('here');
  if (!context.store.getters['auth/isAuthenticated']) {
    context.redirect("/auth");
  }
}