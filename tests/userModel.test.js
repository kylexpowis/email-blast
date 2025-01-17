const { createUser, loginUser } = require("../models/userModel");

jest.mock("../supabase", () => ({
  from: jest.fn(() => ({
    insert: jest.fn(),
  })),
  auth: {
    signInWithPassword: jest.fn(),
  },
}));

const supabase = require("../supabase");

describe("createUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return the created user data", async () => {
    const mockUserData = {
      id: 1,
      username: "kylios",
      email: "kylios@kylios.com",
    };

    supabase.from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({
        data: [mockUserData],
        error: null,
      }),
    });

    const result = await createUser(
      "kylios",
      "kylios@kylios.com",
      "hashedpassword"
    );

    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(supabase.from().insert).toHaveBeenCalledWith([
      {
        username: "kylios",
        email: "kylios@kylios.com",
        password: "hashedpassword",
      },
    ]);
    expect(result).toEqual(mockUserData);
  });

  it("should throw an error if there is an error during insertion", async () => {
    supabase.from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Insert Error" },
      }),
    });

    await expect(
      createUser("kai", "kai@example.com", "hashedpassword")
    ).rejects.toThrow("Insert Error");

    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(supabase.from().insert).toHaveBeenCalledWith([
      { username: "kai", email: "kai@example.com", password: "hashedpassword" },
    ]);
  });
});

describe("loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data on sucessful login", async () => {
    const mockData = {
      user: {
        id: 1,
        email: "test@example.com",
        session: { access_token: "token" },
      },
    };
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: mockData,
      error: null,
    });

    const result = await loginUser("test@example.com", "password123");
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(result).toEqual(mockData);
  });

  it("should throw an error if login fails", async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid login credentials" },
    });
    await expect(
      loginUser("wrong@example.com", "wrongpassword")
    ).rejects.toThrow("Login failed: Invalid login credentials");
  });
});
