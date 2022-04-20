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

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;

}

async function transfer(){
    let token_Id = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value
    let amount = parseInt(document.getElementById("amount_input").value)
    
    const options = {
        type: "erc1155",
        receiver: address,
        contract_address: CONTRACT_ADDRESS,
        tokenId: token_Id,
        amount: amount,
        
    };
    let result = await Moralis.transfer(options);
    console.log(result);
}

document.getElementById("submit_transfer").onclick = transfer;

init();