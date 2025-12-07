import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { setUser, clearUser, setLoading } from "./authSlice";
import { authApi } from "./authApi";

export const initFirebaseAuthListener = (store) => {

  store.dispatch(setLoading(true));

  onAuthStateChanged(auth, async (firebaseUser) => {
    try {
      if (!firebaseUser) {
        store.dispatch(clearUser());
        store.dispatch(setLoading(false));
        return;
      }

      
      const idToken = await firebaseUser.getIdToken(true);

   
    const refreshResult = await store
  .dispatch(authApi.endpoints.refreshToken.initiate({ firebaseToken: idToken }))
  .unwrap()
  .catch(() => null);

      if (!refreshResult?.accessToken) {
        store.dispatch(clearUser());
        return;
      }

   
      store.dispatch(
        setUser({
          user: refreshResult.user,
          accessToken: refreshResult.accessToken,
        })
      );
    } catch (err) {
      console.error("Auth Listener Error:", err);
      store.dispatch(clearUser());
    } finally {
      store.dispatch(setLoading(false));
    }
  });
};
