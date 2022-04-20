appId = "7mdx3HdKUeSuIBRMIsxWpyfyKGQDUV9th5X03O3W";  //APP_ID
serverUrl = "https://z5zicrnulkqi.usemoralis.com:2053/server"; //SERVER_URL
let web3;
Moralis.start({serverUrl, appId});
const CONTRACT_ADDRESS = "0xb737768093e00a13b502781b3078d0c4620e0ccf" //YOUR_CONTRACT_ADDRESS

async function init(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enable();
    let accounts = await web3.eth.getAccounts();

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];

}

async function mint(){
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value
    let amount = parseInt(document.getElementById("amount_input").value)
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    contract.methods.mint(address, tokenId, amount).send({from: accounts[0], value: 0})
    .on("receipt", function(receipt){
        alert("Mint done");
    })
}

document.getElementById("submit_mint").onclick = mint;

init();