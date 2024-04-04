import React, { useState } from "react";
import { Box, Heading, Text, Button, Flex, Image, Badge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaStar, FaShoppingCart, FaTrophy } from "react-icons/fa";

const Index = () => {
  const [points, setPoints] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const products = [
    { id: 1, name: "商品A", price: 1000, premium: false },
    { id: 2, name: "商品B", price: 2000, premium: true },
    { id: 3, name: "商品C", price: 1500, premium: false },
  ];

  const premiumPrice = 5000;

  const buyProduct = (price) => {
    // 購入処理
    alert(`${price}ポイントを消費しました。`);
    setPoints(points - price);
  };

  const buyPremium = () => {
    if (points >= premiumPrice) {
      setIsPremium(true);
      setPoints(points - premiumPrice);
      onClose();
      alert("プレミアム会員になりました！");
    }
  };

  return (
    <Box p={8}>
      <Flex align="center" justify="space-between" mb={8}>
        <Heading as="h1" size="xl">
          マイアプリ
        </Heading>
        <Flex align="center">
          <FaStar color="gold" />
          <Text ml={2}>{points}ポイント</Text>
        </Flex>
      </Flex>

      <Flex wrap="wrap">
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" p={4} m={2} maxW="sm">
            <Image src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwJTI0JTdCcHJvZHVjdC5uYW1lJTdEfGVufDB8fHx8MTcxMjIxNjM3Mnww&ixlib=rb-4.0.3&q=80&w=1080`} mb={4} />
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>
            {product.premium && (
              <Badge colorScheme="purple" mb={2}>
                プレミアム限定
              </Badge>
            )}
            <Text mb={4}>{product.price}ポイント</Text>
            <Button leftIcon={<FaShoppingCart />} colorScheme="blue" disabled={product.premium && !isPremium} onClick={() => buyProduct(product.price)}>
              購入する
            </Button>
          </Box>
        ))}
      </Flex>

      {!isPremium && (
        <Button mt={8} size="lg" colorScheme="yellow" leftIcon={<FaTrophy />} onClick={onOpen}>
          プレミアム会員になる
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プレミアム会員</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>プレミアム会員になると以下の特典が受けられます：</Text>
            <ul style={{ marginLeft: "1em" }}>
              <li>プレミアム限定商品の購入</li>
              <li>広告非表示</li>
              <li>お得なクーポン</li>
            </ul>
            <Text mt={4}>{premiumPrice}ポイントでプレミアム会員になれます。</Text>
            <Button mt={6} colorScheme="yellow" onClick={buyPremium} disabled={points < premiumPrice}>
              プレミアム会員になる
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
