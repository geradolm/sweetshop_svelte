<script>
    import { onMount } from "svelte";
    import axios from "axios";

    let items = [];
    let error = null;
    let id = "";
    let name = "";
    let quantity = "";
    let price = "";
    let description = "";
    let isSuccess = false;

    function submitHandler() {
        isSuccess = true;
    }

    const addItem = () => {
        console.log(id, name, quantity, price, description);
        axios
            .post(`http://localhost:5000/api/products/add`, {
                id: id,
                name: name,
                quantity: quantity,
                price: price,
                description: description,
            })
            .then((response) => {
                console.log(response);
                refreshData();
                alert(response.data.id);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
            });
        id = "";
        name = "";
        quantity = "";
        price = "";
        description = "";
    };
</script>

<main>
    <h1>Adding Item</h1>
    <div class="adding">
        <form id="adding_item" on:submit|preventDefault={submitHandler}>
            <label for="addId"><b>ID:</b></label>
            <input type="number" id="addId" bind:value={id} required />
            <label for="addName"><b>Product:</b></label>
            <input type="text" id="addName" bind:value={name} required />
            <label for="addQuantity"><b>Quantity:</b></label>
            <input
                type="number"
                id="addQuantity"
                bind:value={quantity}
                required
            />
            <label for="addPrice"><b>Price: £</b></label>
            <input
                type="number"
                min="0.00"
                max="100.00"
                step="0.01"
                id="addPrice"
                bind:value={price}
                required
            />
            <label for="addDescription"><b>Description:</b></label>
            <input
                type="text"
                id="addDescription"
                bind:value={description}
                required
            /><br />
            <button class="btn" type="submit" on:click={addItem}>Adding</button>
        </form>
    </div>
</main>
