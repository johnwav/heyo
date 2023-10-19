export default class UserIDConverter {
    private mapping: Record<string, number> = {};

    private generateRandomNumber(): number {
      const min = 1;
      const max = Math.pow(2, 32) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public mapUserIDToRandomNumber(userID: string): number {
      if (userID in this.mapping) {
        return this.mapping[userID];
      }

      const randomNumber = this.generateRandomNumber();
      this.mapping[userID] = randomNumber;
      return randomNumber;
    }

    public reverseMapRandomNumberToUserID(randomNumber: number): string | undefined {
      for (const userID in this.mapping) {
        if (this.mapping[userID] === randomNumber) {
          return userID;
        }
      }
      return undefined;
    }
  }

  // Example usage:
//   const converter = new UserIDConverter();

//   const userID = "64e5e0a00ef656a637fe780c";
//   const randomNumber = converter.mapUserIDToRandomNumber(userID);
//   console.log("Mapped User ID:", userID, "to Random Number:", randomNumber);

//   const reversedUserID = converter.reverseMapRandomNumberToUserID(randomNumber);
//   console.log("Reversed Random Number:", randomNumber, "to User ID:", reversedUserID);
