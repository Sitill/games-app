
export const objectToArray = (object: any) : any[] => {
  const array = [];
  for (let f in object) {
    array.push(object[f]);
  }
  return array;
}

