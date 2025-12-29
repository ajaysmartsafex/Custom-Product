import { AuthForm, useAuth } from '../../../../ui-auth/index';

export default function AdminRegister() {
    const { register } = useAuth();

    return (
        <AuthForm
            mode="register"
            role="ADMIN"
            onSubmit={register}
        />
    );
}