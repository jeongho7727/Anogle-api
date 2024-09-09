import usersSignInRoutes from './sign-in';
import usersSignupRoutes from './sign-up';
import usersAttendances from './attendances';

export default [...usersSignInRoutes, ...usersSignupRoutes, ...usersAttendances];
