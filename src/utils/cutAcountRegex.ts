/**
 * 
 * @param account 
 * @returns string
 */
export const cutAccountRegex = (account: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const matchStrings = account.match(truncateRegex)

  if(!matchStrings) return account
  return `${matchStrings[1]}...${matchStrings[2]}`
}