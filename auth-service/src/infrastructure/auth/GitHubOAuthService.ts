import { GitHubUserData } from "../../presentation/dto/GitHubUserData";

export class GitHubOAuthService {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly redirectUrl: string;

    constructor() {
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        const redirectUrl = process.env.GITHUB_REDIRECT_URL;

        if (!clientId || !clientSecret || !redirectUrl) {
            throw new Error('GitHub OAuth credentials not found in environment variables');
        }
        
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUrl = redirectUrl;
    }

    private async exchangeCodeForToken(code: string): Promise<string> {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                redirect_uri: this.redirectUrl,
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error(`GitHub token exchange failed: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            throw new Error(`GitHub OAuth error: ${tokenData.error_description || tokenData.error}`);
        }

        return tokenData.access_token;
    }

    private async getGitHubUser(accessToken: string): Promise<GitHubUserData> {
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            },
        });

        if (!userResponse.ok) {
            throw new Error(`GitHub API error: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        
        return {
            id: userData.id.toString(),
            login: userData.login,
            email: userData.email,
            name: userData.name || userData.login,
            avatar_url: userData.avatar_url,
        };
    }

    async getUserData(code: string): Promise<GitHubUserData> {
        const accessToken = await this.exchangeCodeForToken(code);
        const userData = await this.getGitHubUser(accessToken);
        return userData;
    }

    getAuthorizationUrl(): string {
        const params = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            scope: 'user:email',
        });
        
        return `https://github.com/login/oauth/authorize?${params.toString()}`;
    }
}