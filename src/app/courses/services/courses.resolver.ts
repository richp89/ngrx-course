import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CourseEntityService } from "./course-entity.service";
import { filter, first, map, tap } from "rxjs/operators";

export const coursesResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  coursesService: CourseEntityService = inject(CourseEntityService)
): Observable<boolean> => {
  return coursesService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        coursesService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};
