import { GitHubUserData } from "../../domain/entities/GitHubUserData";
export interface IGitHubOAuthService{
    getUserData(code: string): Promise<GitHubUserData>
    getAuthorizationUrl(): string
}