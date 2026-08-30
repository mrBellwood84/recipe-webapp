import {UserProfileResponse} from "@/lib/models/auth/userProfileResponse";

export interface DevUserAccount {
  label: string;
  description: string;
  credentials: {
    email: string;
    password?: string;
  };
  mockProfile: UserProfileResponse;
}

export const DEV_USERS: Record<string, DevUserAccount> = {
  admin: {
    label: "System Admin",
    description: "Full tilgang og admin-rettigheter",
    credentials: {
      email: "admin@kjoekkenhylla.local",
      password: "AdminSuperSecretPassword123!",
    },
    mockProfile: {
      userId: "11111111-1111-1111-1111-111111111111",
      userName: "admin@recipeapp.com",
      email: "admin@recipeapp.com",
      firstName: "System",
      lastName: "Admin",
      role: "Admin",
      hasPassword: true,
      isGoogleAccount: false,
      isEmailConfirmed: true,
      welcomeCompleted: true,
      isLocked: false,
      createdAt: "2026-01-01T00:00:00Z",
      lastLoginAt: new Date().toISOString(),
    },
  },
  confirmed: {
    label: "Bekreftet Bruker",
    description: "Standard fungerende konto (Ola Nordmann)",
    credentials: {
      email: "confirmed@example.com",
      password: "DevUser123!",
    },
    mockProfile: {
      userId: "22222222-2222-2222-2222-222222222222",
      userName: "confirmed@example.com",
      email: "confirmed@example.com",
      firstName: "Ola",
      lastName: "Nordmann",
      role: "User",
      hasPassword: true,
      isGoogleAccount: false,
      isEmailConfirmed: true,
      welcomeCompleted: true,
      isLocked: false,
      createdAt: "2026-01-01T00:00:00Z",
      lastLoginAt: new Date().toISOString(),
    },
  },
  unconfirmed: {
    label: "Ubekreftet Bruker",
    description: "Viser varsel om bekreftelses-epost (Kari Ubekreftet)",
    credentials: {
      email: "unconfirmed@example.com",
      password: "DevUser123!",
    },
    mockProfile: {
      userId: "33333333-3333-3333-3333-333333333333",
      userName: "unconfirmed@example.com",
      email: "unconfirmed@example.com",
      firstName: "Kari",
      lastName: "Ubekreftet",
      role: "User",
      hasPassword: true,
      isGoogleAccount: false,
      isEmailConfirmed: false,
      welcomeCompleted: true,
      isLocked: false,
      createdAt: "2026-01-01T00:00:00Z",
      lastLoginAt: new Date().toISOString(),
    },
  },
  newUser: {
    label: "Ny Bruker",
    description: "Ubekreftet e-post og ufullført velkomstsone (Pelle Nykomling)",
    credentials: {
      email: "newuser@example.com",
      password: "DevUser123!",
    },
    mockProfile: {
      userId: "44444444-4444-4444-4444-444444444444",
      userName: "newuser@example.com",
      email: "newuser@example.com",
      firstName: "Pelle",
      lastName: "Nykomling",
      role: "User",
      hasPassword: true,
      isGoogleAccount: false,
      isEmailConfirmed: false,
      welcomeCompleted: false,
      isLocked: false,
      createdAt: "2026-01-01T00:00:00Z",
      lastLoginAt: null,
    },
  },
  googleUser: {
    label: "Google Bruker",
    description: "Ingen lokalt passord (Viser 'Opprett passord' i profilen)",
    credentials: {
      email: "googleuser@example.com",
    },
    mockProfile: {
      userId: "55555555-5555-5555-5555-555555555555",
      userName: "googleuser@example.com",
      email: "googleuser@example.com",
      firstName: "Google",
      lastName: "Bruker",
      role: "User",
      hasPassword: false,
      isGoogleAccount: true,
      isEmailConfirmed: true,
      welcomeCompleted: true,
      isLocked: false,
      createdAt: "2026-01-01T00:00:00Z",
      lastLoginAt: new Date().toISOString(),
    },
  },
};