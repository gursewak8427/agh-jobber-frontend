export const getAddress = property => `${property?.address1}, ${property?.address2}, ${property?.city}, ${property?.province}, ${property?.country}`
export const getPrimary = list => list?.filter((item) => item?.primary)?.[0]
export const getClientName = client => client?.fname ? client?.fname + ' ' + client?.lname : client?.companyname