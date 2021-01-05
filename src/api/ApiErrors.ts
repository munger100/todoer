export class ApiErrors extends Error {
  constructor(
    public readonly errors: string[],
    public readonly statusCode?: number,
    public readonly metadata?: { unexpected?: boolean; [key: string]: unknown }
  ) {
    super(
      `ApiErrors: ${errors.join("\n")}${
        metadata ? "\n" + JSON.stringify(metadata, undefined, "  ") : ""
      }`
    );

    Object.setPrototypeOf(this, ApiErrors.prototype);
  }
}
