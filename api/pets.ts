import instance from ".";

const Allpets = async () => {
  const responce = await instance.get("/pets");
  return responce.data;
};
/// data is part of the responce im getting from the API

const Onepets = async ( id : Number) => {
  const responce = await instance.get(`/pets/${id}`);
  return responce.data;
};


const OnepetsDelete = async ( id : Number) => {
  const responce = await instance.delete(`/pets/${id}`);
  return responce.data;
};

// const OnepetsPost = async ( id : Number) => {
//   const responce = await instance.post(`/pets/${id}`);
//   return responce.data;
// };

const OnepetsPost = async (newPet: {
  name: string;
  image: string;
  type: string;
  adopted: number;
}) => {
  const response = await instance.post("/pets", newPet);
  return response.data;
};

export {Allpets, Onepets,OnepetsDelete, OnepetsPost };


