export interface LoginCredentials {
	email: string;
	password: string;
}

export type StatusType = "pending" | "approved" | "rejected" | "archived" | "blocked";
