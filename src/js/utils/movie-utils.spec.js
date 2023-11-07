import { describe, expect, test } from "@jest/globals";
import { getMoviePosterUrl } from "./movie-utils";
import { movies } from "../data/movies";

describe("Movie poster url", () => {
  test("returns a string", () => {
    //Arrange
    const path = movies[0].path;
    const posterWidth = 400;
    const expectedResult = `http://image.tmdb.org/t/p/w${posterWidth}`;

    // Action
    const movieUrl = getMoviePosterUrl(path, posterWidth);

    // Assert
    expect(movieUrl).not.toBeNull();
    expect(movieUrl).toBeDefined();
    expect(movieUrl).toBe(expectedResult);
  });

  test("return null when path is not a string", () => {
    //Arrange
    const path = 400;
    const posterWidth = 400;
    const expectedResult = `http://image.tmdb.org/t/p/w${posterWidth}`;

    // Action
    const movieUrl = getMoviePosterUrl(path, posterWidth);

    // Assert
    expect(movieUrl).toBeNull();
  });

  test("return null when width is not a number", () => {
    //Arrange
    const path = true;
    const posterWidth = 400;
    const expectedResult = `http://image.tmdb.org/t/p/w${posterWidth}`;

    // Action
    const movieUrl = getMoviePosterUrl(path, posterWidth);

    // Assert
    expect(movieUrl).toBeNull();
  });
});
