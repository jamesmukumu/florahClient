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

useHead({
  script: [
    {
      src: "https://script-tags.delightchatmedia.com/whatsapp-chat-button/embeds/embed.min.js",
      defer: true
    }
  ]
})

onMounted(() => {
  const wa_btnSetting = {
    btnColor:"#16BE45",
    ctaText:"Reach Us",
    cornerRadius:40,
    marginBottom:20,
    marginLeft:20,
    marginRight:20,
    btnPosition:"left",
    whatsAppNumber:"254714416325",
    welcomeMessage:"Welcome, thank you for reaching out to us. How can we help you?",
    zIndex:999999,
    btnColorScheme:"light"
  }

  const interval = setInterval(() => {
    if (typeof window._waEmbed === "function") {
      window._waEmbed(wa_btnSetting)
      clearInterval(interval)
    }
  }, 200)
})

</script>