import { AuthForm, useAuth } from '../../../../ui-auth/index';

export default function AdminLogin() {
    const { login } = useAuth();

    return (
        <AuthForm
            mode="login"
            role="ADMIN"
            onSubmit={login}
        />
    );
}
