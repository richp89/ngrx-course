import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const store: Store<AppState> = inject(Store);
  const router: Router = inject(Router);
  return store.pipe(
    select(isLoggedIn),
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigateByUrl("/login");
      }
    })
  );
};
