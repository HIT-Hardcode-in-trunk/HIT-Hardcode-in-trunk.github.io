const svgContainer = document.getElementById('svg');
const animItem = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: "https://assets4.lottiefiles.com/packages/lf20_wycox7py.json"
});