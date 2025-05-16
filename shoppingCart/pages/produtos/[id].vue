<template>
    <div class="produto-detalhe">
        <div class="produto-detalhe__container">
            <div class="produto-detalhe__imagem">
                <img v-if="produto.imagem" :src="produto.imagem" :alt="produto.nome" />
                <div v-else class="produto-detalhe__imagem-placeholder"></div>
            </div>

            <div class="produto-detalhe__info">
                <h1 class="produto-detalhe__nome">{{ produto.nome }}</h1>

                <div class="produto-detalhe__preco">
                    {{ formatPrice(produto.preco) }}
                </div>

                <div class="produto-detalhe__descricao">
                    <p>{{ produto.descricao }}</p>
                </div>

                <div class="produto-detalhe__acoes">
                    <add-to-cart-button :product="produtoParaCarrinho" @added-to-cart="handleAddedToCart" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AddToCartButton from '~/components/AddToCartButton.vue';

// Em um caso real, você buscaria os dados do produto da API ou store
// Aqui estamos simulando um produto
const route = useRoute();
const produtoId = route.params.id;

// Dados mockados do produto (em um caso real, viria de uma API)
const produto = ref({
    id: produtoId,
    nome: 'Produto Exemplo',
    preco: 99.90,
    descricao: 'Este é um produto de exemplo para demonstrar o funcionamento do carrinho de compras.',
    imagem: null,
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

// Converter o modelo de produto para o formato esperado pelo carrinho
const produtoParaCarrinho = computed(() => ({
    id: produto.value.id,
    name: produto.value.nome,
    price: produto.value.preco,
    image: produto.value.imagem
}));

// Manipulador para quando o produto é adicionado ao carrinho
const handleAddedToCart = (event) => {
    // Aqui você pode realizar ações após adicionar ao carrinho, como:
    // - Exibir uma notificação
    // - Abrir o drawer do carrinho
    // - Redirecionar para o carrinho
    console.log('Produto adicionado:', event);
};
</script>

<style scoped>
.produto-detalhe__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
}

.produto-detalhe__imagem {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.produto-detalhe__imagem img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.produto-detalhe__imagem-placeholder {
    width: 100%;
    height: 100%;
    background-color: #eee;
    border-radius: 8px;
}

.produto-detalhe__info {
    flex: 1;
}

.produto-detalhe__nome {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.produto-detalhe__preco {
    font-size: 1.25rem;
    font-weight: bold;
    color: #4caf50;
    margin-bottom: 1.5rem;
}

.produto-detalhe__descricao {
    margin-bottom: 2rem;
    color: #666;
    line-height: 1.6;
}

.produto-detalhe__acoes {
    margin-top: 1rem;
}

@media (min-width: 768px) {
    .produto-detalhe__container {
        flex-direction: row;
        align-items: flex-start;
    }

    .produto-detalhe__imagem {
        height: 400px;
    }
}
</style>