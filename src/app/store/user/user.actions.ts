// src/app/store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: { name: string; email: string; role: string; _id: string } }>()
);

export const clearUser = createAction('[Auth] Clear User');