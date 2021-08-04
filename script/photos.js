<script type="text/javascript">

    Array.prototype.forEach.call(document.querySelector("img"), function (elem) {
    elem.addEventListener("click", function () {
        elem.classList.toggle("enlarged");
    });
})
;

</script>