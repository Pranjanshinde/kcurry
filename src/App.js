import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Box ,Button,Text,InputGroup,Input,InputRightAddon,Select,Heading,Divider, border,InputLeftAddon,useDisclosure,Checkbox } from '@chakra-ui/react';
import {AddIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { pipe } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Editprods, Getproducts, postProduct } from './redux/action';

let initdata=[
  {
    _id: "66ade93ed973baf70375f933",
    title: "Aluminium 45 pipe",
    price: "400/kg",
    product: "pipe",
    material: "Aluminium",
    shape: "round",
    length: "2m",
    thickness: "1mm to 3mm",
    surface: "single",
    outdia: "5''",
    __v: 0
}
]

const materialdata={
  pipe:{
    materials:{
      stainless_steel:[
        "stainless steel 304 pipes","stainless steel 316 pipes","stainless steel 316 pipes"
      ],
      aluminium:[
        "aluminium f11 pipes","aluminium f5 pipes","aluminium f91 pipes"
      ],
      titanium:[
        "titanium CP4 pipes","titanium CP3 pipes","titanium CP2 pipes"
      ]
    }
  },
  gasket:{
    materials:{
      stainless_steel:[
        "stainless steel 304 gasket","stainless steel 316 gasket","stainless steel 316 gasket"
      ],
      aluminium:[
        "aluminium f11 gasket","aluminium f5 gasket","aluminium f91 gasket"
      ],
      titanium:[
        "titanium CP4 gasket","titanium CP3 gasket","titanium CP2 gasket"
      ]
    }
  },
  tube:{
    materials:{
      stainless_steel:[
        "stainless steel 304 tube","stainless steel 316 tube","stainless steel 316 tube"
      ],
      aluminium:[
        "aluminium f11 tube","aluminium f5 tube","aluminium f91 tube"
      ],
      titanium:[
        "titanium CP4 tube","titanium CP3 tube","titanium CP2 tube"
      ]
    }
  },
  valve:{
    materials:{
      stainless_steel:[
        "stainless steel 304 valve","stainless steel 316 valve","stainless steel 316 valve"
      ],
      aluminium:[
        "aluminium f11 valve","aluminium f5 valve","aluminium f91 valve"
      ],
      titanium:[
        "titanium CP4 valve","titanium CP3 valve","titanium CP2 valve"
      ]
    }
  }
}

const keys = Object.keys(materialdata);
// console.log(keys);

function App() {
  const [expandedRows, setExpandedRows] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prods,setProds]=useState("pipe");
  const [mat,setMat]=useState("stainless_steel");
  const [title,setTitle]=useState("");
  const dispatch=useDispatch();
  const [singles,setSingles]=useState({});
  const [search,setSearch]=useState("");
  const [thing,setThing]=useState("");
  const [material,setMaterial]=useState("");

  const toggleSubrows = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }

  console.log(prods,mat,title);

  function postprod(){
    const data={
      title: title,
      price: "400/kg",
      product: prods,
      material: mat,
      shape: "",
      length: "",
      thickness: "",
      surface: "",
      outdia: "",
    }
    dispatch(postProduct(data));
  }

  const myprod=useSelector((state)=>{
    // console.log(state.products);
    return state.products
  })

  function setsprod(item){
    console.log(item);
    setProds(item);
  }

  function Editproducts(item){
    dispatch(Editprods(item));
  }

  function setmate(item)
  {
    console.log(item);
    setMat(item);
  }

  function settitle(value)
  {
    setTitle(value);
  }

  function edititsprod(e){
    setSingles({...singles,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    dispatch(Getproducts(search,thing,material));
  },[]);
  

console.log(title);

  return (
    <div className="App">
        <>
     

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
       <Box height={"200px"} display={"flex"} justifyContent={"space-evenly"}>
        <Box border={"1px solid #7CB9E8"} w={"30%"} textAlign={"center"} borderRadius={"7px"}>
          <Heading as='h5' size='md'>Products
          </Heading>
          {
              keys.map((item,index)=>{
                return(
                  <Box  h={"30px"} borderRadius={"15px"} _hover={{ bg: 'lightblue' }}  onClick={()=>{setsprod(item)}} bg={item==prods?"lightblue":"white"}  w={"90%"} margin={"auto"}>
                    {item}
                  </Box>
                )
              })
            }
        </Box>
        <Box border={"1px solid #7CB9E8"} w={"20%"} textAlign={"center"} borderRadius={"7px"}>
        <Heading as='h5' size='md'>Materials</Heading>
        {
              Object.keys(materialdata[prods].materials)?.map((item,index)=>{
                return(
                  <Box  h={"30px"} borderRadius={"15px"} _hover={{ bg: 'lightblue' }} onClick={()=>{setmate(item)}} bg={item==mat?"lightblue":"white"}  w={"90%"} margin={"auto"}>
                    {item}
                  </Box>
                )
              })
            }
        </Box>
        <Box border={"1px solid #7CB9E8"} w={"30%"} textAlign={"center"} borderRadius={"7px"}>
        <Heading as='h5' size='md'>Grades</Heading>
        {
              materialdata[prods].materials[mat].map((item,index)=>{
                return(
                  <Box  h={"30px"} borderRadius={"15px"}  w={"90%"} margin={"auto"} display={"flex"} onChange={()=>{settitle(item)}}  >
                    <Checkbox >{item}</Checkbox>
                  </Box>
                  
                )
              })
            }
        </Box>
       </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{postprod();onClose();}} >
              Submit
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
   <Box>
    <Box  h={"300px"} bg={"#E0FFFF"}>
      <Box  h={"150px"} alignItems={"center"} alignContent={"center"} w={"40%"} display={"flex"}>
      <Button colorScheme='blue'marginLeft={"80px"} alignItems={"center"} justifyContent={"space-between"} w={"200px"} borderRadius={"30px"} onClick={onOpen} > <AddIcon/> Add Products</Button>
      <Box border={"none"} w={"250px"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} h={"50px"} borderRadius={"25px"} marginLeft={"30px"} bg={"white"}><Text fontSize={"22px"} >280/400</Text>products</Box>
      </Box>
      <Box  marginLeft={"80px"} w={"50%"}>
      <InputGroup size='md' borderRadius={"15px"}>
    <Input placeholder='search products...' bg={"white"} onChange={(e)=>setSearch(e.target.value)}  />
    <InputRightAddon bgColor={"blue"} color={"white"} w={"200px"} alignContent={"center"} justifyContent={"center"} onClick={()=>{dispatch(Getproducts(search,thing,material))}} >search</InputRightAddon>
  </InputGroup>
      </Box>
      <Box  marginLeft={"80px"} marginTop={"35px"} display={"flex"} w={"50%"} justifyContent={"space-between"}>
      <Select placeholder='Products' w={"250px"} bg={"white"} onChange={(e)=>setThing(e.target.value)}>
  <option value='pipe'>pipe</option>
  <option value='gasket'>gasket</option>
  <option value='tube'>tube</option>
  <option value='valve'>valve</option>
</Select>
<Select placeholder='Materials' w={"250px"} bg={"white"} onChange={(e)=>setMaterial(e.target.value)}>
  <option value='stainless_steel'>stainless_steel</option>
  <option value='aluminium'>aluminium</option>
  <option value='titanium'>titanium</option>
</Select>
<Button bg={"white"} onClick={()=>{dispatch(Getproducts(search,thing,material))}}>filter</Button>
      </Box>
    </Box>
   </Box>
   <Box margin={"auto"} width={"90%"}>
   <TableContainer border={"1px solid black"} borderRadius={"8px"}>
  <Table variant='simple'>
    <Thead bg={"#00BFFF"}>
      <Tr>
        <Th>Products</Th>
        <Th>Action</Th>
        <Th>Product details</Th>
        <Th>Price in units</Th>
      </Tr>
    </Thead>
    <Tbody>
      {/* <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr> */}
      {
        myprod?.map((item,index)=>{
          return(
            <>
            <Tr display={Object.keys(expandedRows).includes(item._id)&&expandedRows[item._id]==true ?"none":"-moz-initial"}>
        <Td>{item.title}</Td>
        <Td display={"flex"} gap={"15px"} h={"100px"} alignItems={"center"}><Text color={"blue"} onClick={() =>{ toggleSubrows(item._id,item);setSingles(item)}}>Quick Edit</Text> | <Text color={"blue"}>Add details</Text></Td>
        <Td >
         material: {item.material}<br/>
         unit length: {item.length}<br/>
         shape:{item.shape}......
        </Td>
        <Td>{item.price}</Td>
      </Tr>
      {expandedRows[item._id] &&
        <Tr  h={"300px"} borderBottom={"1px solid black"} >
         <Heading as='h5' size='sm' marginLeft={"10px"} display={"block"}>
  Quick Edit
  </Heading>
  <Box  w={"800px"} h={"50px"} position={"absolute"} display={"flex"} justifyContent={"space-between"}>
        <Box  alignContent={"center"} > Title &nbsp;&nbsp; {singles.title}</Box>
        <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Price &nbsp;&nbsp;   <InputGroup size='sm' >
    <InputLeftAddon borderLeftRadius={"20px"}>INR</InputLeftAddon>
    <Input />
    <InputRightAddon borderRightRadius={"20px"}>KG</InputRightAddon>
  </InputGroup></Box>
  </Box>
  <Divider orientation='horizontal' bg={"black"} margin={"auto"} marginTop={"60px"} position={"absolute"} w={"90%"}  />
  <Box position={"absolute"}  w={"90%"} marginTop={"70px"} h={"140px"}>
    <Box  h={"40%"} display={"flex"} justifyContent={"space-evenly"}>
   
        
        <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Material &nbsp;&nbsp;   
    <Input borderRadius={"20px"} name='material' value={singles.material} onChange={edititsprod}  />
  </Box>
  <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Shape &nbsp;&nbsp;   
    <Input borderRadius={"20px"} value={singles.shape} name='shape' onChange={edititsprod} />
  </Box>
  <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Length &nbsp;&nbsp;   
    <Input borderRadius={"20px"} value={singles.length} name='length' onChange={edititsprod} />
  </Box>
    </Box>
    <Box h={"40%"} display={"flex"} justifyContent={"space-evenly"}>
   
        
        <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Thickness &nbsp;&nbsp;   
    <Input borderRadius={"20px"} value={singles.thickness} name='thickness' onChange={edititsprod}  />
  </Box>
  <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Surface finish &nbsp;&nbsp;   
    <Input borderRadius={"20px"} value={singles.surface} name='surface' onChange={edititsprod}/>
  </Box>
  <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"}> Outside Dia. &nbsp;&nbsp;   
    <Input borderRadius={"20px"} value={singles.outdia} name='outdia' onChange={edititsprod} />
  </Box>
    </Box>
    <Box position={"absolute"}  w={"300px"} h={"40px"} display={"flex"} justifyContent={"space-between"} marginLeft={"25px"}>
    <Button colorScheme='blue' borderRadius={"18px"} onClick={() =>{ toggleSubrows(item._id);Editproducts(singles);}} name='lily'>Update</Button>
    <Button colorScheme='black' variant='outline' borderRadius={"18px"} onClick={()=>{toggleSubrows(item._id,item)}}>
    cancel
  </Button>
    </Box>

  </Box>

  
        </Tr>
      }
            </>
          )
        })
      }
    </Tbody>
  </Table>
</TableContainer>
   </Box>
    </div>
  );
}

export default App;
