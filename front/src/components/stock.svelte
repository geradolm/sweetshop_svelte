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

    $: stockTotal = () =>
        items.reduce((total, item) => total + item.quantity * item.price, 0);

    const refreshData = () => {
        axios
            .get(`http://localhost:5000/api/products/`)
            .then((response) => {
                items = response.data;
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
            });
    };

    const updateItem = () => {
        axios
            .put(`http://localhost:5000/api/products/update/${id}`, {
                id: id,
                name: name,
                quantity: quantity,
                price: price,
                description: description,
            })
            .then((response) => {
                console.log(response);
                refreshData();
                alert("success");
                // alert(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
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

    const deleteClick = (id) => {
        if (!confirm("Are you sure?")) {
            return;
        }
        axios
            .delete(`http://localhost:5000/api/products/delete/` + id)
            .then((response) => {
                response.data;
            });
        refreshData();
        alert("success");
    };
    onMount(refreshData);
</script>

<main>
    <div>
        <div>
            <b>Total Stock: £{stockTotal()}</b>
        </div>
        <h1>Sweet Shop Stock</h1>
        <div>
            <table class="sweets">
                <thead class="sweets_product">
                    <tr class="sweets_name">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody class="body">
                    {#each items as row}
                        <tr class="data">
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.quantity}</td>
                            <td>£{row.price}</td>
                            <td>{row.description}</td>
                            <td
                                ><button
                                    type="button"
                                    on:click={deleteClick(row.id)}
                                    >Delete</button
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
            <br /><br /><br />
        </div>
        <h1>Update Item</h1>
        <div class="updating">
            <form id="updating_item" on:submit|preventDefault={submitHandler}>
                <label for="updateId"><b>ID:</b></label>
                <input type="number" id="updateId" bind:value={id} required />
                <label for="updateName"><b>Product:</b></label>
                <input type="text" id="updateName" bind:value={name} required />
                <label for="updateQuantity"><b>Quantity:</b></label>
                <input
                    type="number"
                    id="updateQuantity"
                    bind:value={quantity}
                    required
                />
                <label for="updatePrice"><b>Price: £</b></label>
                <input
                    type="number"
                    min="0.00"
                    max="100.00"
                    step="0.01"
                    id="updatePrice"
                    bind:value={price}
                    required
                />
                <label for="updateDescription"><b>Description:</b></label>
                <input
                    type="text"
                    id="updateDescription"
                    bind:value={description}
                    required
                /><br />
                <button class="btn" type="submit" on:click={updateItem}
                    >Update</button
                >
            </form>
        </div>
    </div>
</main>

<style>
</style>
