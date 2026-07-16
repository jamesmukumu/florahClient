<template>
<div>
<UApp :toaster="toaster"/>
<Header/>
<slot/>

<Footer/>
</div>


</template>


<script setup>
let toaster = {position:"top-right"}
</script>