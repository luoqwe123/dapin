<template>
    <div class='row'>
        <div class='btn-switch'>
            <input type='checkbox' id='switch'>
            <label for='switch'><span></span></label>
        </div>
    </div>
</template>

<script setup lang='ts'>
</script>

<style scoped lang="scss">
.btn-switch *,
.btn-switch *:before,
.btn-switch *:after {
    box-sizing: border-box;
}

.btn-switch {
    display: inline-block;
    position: relative;
    line-height: 25px;
    /* 50px / 2 */
    height: 28px;
    /* 56px / 2 */
    width: 84px;
    /* 168px / 2 */
    border-radius: 12.5px;
    /* 25px / 2 */
    background: linear-gradient(WhiteSmoke, DarkGray);
    box-shadow: 0 0 2.5px rgba(0, 0, 0, .4),
        /* 5px / 2 */
        0.5px 0.5px 4px rgba(0, 0, 0, .3);
    /* 1px 1px 8px / 2 */
    margin: 0 auto;
}

.btn-switch input {
    display: none
}

.btn-switch label {
    position: absolute;
    top: 3px;
    /* 6px / 2 */
    left: 5px;
    /* 10px / 2 */
    width: 75px;
    /* 150px / 2 */
    height: 22px;
    /* 44px / 2 */
    line-height: 22px;
    /* 44px / 2 */
    border-radius: 10px;
    /* 20px / 2 */
    background: darkGray;
    box-shadow: inset 0 1.5px 4px 0.5px rgba(0, 0, 0, .4),
        /* inset 0 3px 8px 1px / 2 */
        0 0.5px 0 0 rgba(255, 255, 255, .5);
    /* 0 1px 0 0 / 2 */
    cursor: pointer;
}

.btn-switch span::before {
    content: " ";
    position: absolute;
    width: 45px;
    /* 90px / 2 */
    height: 23px;
    /* 46px / 2 */
    background: linear-gradient(#F7F2F6, #B2AC9E);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3),
        /* 0 0 8px / 2 */
        0 2.5px 2.5px rgba(0, 0, 0, 0.2);
    /* 0 5px 5px / 2 */
    border-radius: 12px;
    /* 24px / 2 */
    left: -1px;
    /* -2px / 2 */
    top: -0.5px;
    /* -1px / 2 */
}

.btn-switch span::after {
    content: " ";
    position: absolute;
    width: 33px;
    /* 66px / 2 */
    height: 12px;
    /* 24px / 2 */
    left: 5px;
    /* 10px / 2 */
    top: 5px;
    /* 10px / 2 */
    border-radius: 6px;
    /* 12px / 2 */
    background: linear-gradient(#CBC7BC, #D2CBC3);
}

.btn-switch label::before {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 11px;
    /* 22px / 2 */
    font-weight: bold;
    text-transform: uppercase;
    text-shadow: 0 -0.5px 0 rgba(0, 0, 0, .7),
        /* 0 -1px 0 / 2 */
        0 0.5px 0 rgba(255, 255, 255, .8);
    /* 0 1px 0 / 2 */
    position: absolute;
    content: 'off';
    color: dimgrey;
    left: auto;
    right: 5%;
    /* 10% / 2 */
}

.btn-switch input:checked+label {
    background: rgba(144, 238, 144, .8);
}

.btn-switch input:checked~label span::before {
    right: -1px;
    /* -2px / 2 */
    left: auto;
}

.btn-switch input:checked~label span::after {
    right: 5px;
    /* 10px / 2 */
    left: auto;
}

.btn-switch input:checked~label::before {
    content: 'on';
    color: rgba(46, 139, 87, .8);
    right: auto;
    left: 5%;
    /* 10% / 2 */
}
</style>