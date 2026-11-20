declare const _default: () => {
    env: string;
    port: number;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    seed: {
        adminEmail: string;
        adminPassword: string;
    };
};
export default _default;
