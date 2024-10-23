const { createUser } = require("../models/userModel");

jest.mock("../supabase", () => ({
  from: jest.fn(() => ({
    insert: jest.fn(),
  })),
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
        error: "Insert Error",
      }),
    });

    await expect(
      createUser("kai", "kai@example.com", "hashedpassword")
    ).rejects.toThrow("Insert Error");

    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(supabase.from().insert).toHaveBeenCalledWith([
      {
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      },
    ]);
  });
});
