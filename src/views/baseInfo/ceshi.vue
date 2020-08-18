<template>
    
</template>

<script>
    var subList=new Vue({
        el:'#main',
        data:{
            // subcontentData为本地数据
            subContents:subcontentData,
            // 页面需要展现的数据
            yemiandata:[],
            // 页面展现条数
            datanum:12,
            // 开始椰树
            startnum:0,
            // 结束椰树
            endnum:1,
            // 一共多少页
            btnnum:0,
            // 生成切换页面的按钮用
            listnum:[],
            // input跳转
            jemp:1,
        },
        methods:{
            filters(num){
                this.subContents=subcontentData;
                // 需要重置防止翻页导致startnum和endnum不一致
                this.startnum=0;
                this.endnum=1;
                // 这里是判断筛选按钮
                switch(num){
                    case 0: $('#sublist li').css({
                        background:'#f2f2f2'
                    }).eq(0).css({
                        background:'#dbe9f0'
                    });
                        this.fenye();
                        break;
                    case 1:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(1).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('行政');
                        });
                        this.fenye();
                        break;
                    case 2:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(2).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('报关');
                        });
                        this.fenye();
                        break;
                    case 3:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(3).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('组装');
                        });
                        this.fenye();
                        break;
                    case 4:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(4).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('电子');
                        });
                        this.fenye();
                        break;
                    case 5:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(5).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('工艺');
                        });
                        this.fenye();
                        break;
                    case 6:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(6).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('财务');
                        });
                        this.fenye();
                        break;
                    case 7:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(7).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('制造');
                        });
                        this.fenye();
                        break;
                    case 8:
                        $('#sublist li').css({
                            background:'#f2f2f2'
                        }).eq(8).css({
                            background:'#dbe9f0'
                        });
                        this.subContents=this.subContents.filter(num=>{
                            return String(num['department']).includes('销售');
                        });
                        this.fenye();
                        break;
                }
            },
            // 分野函数
            fenye(){
                this.yemiandata=this.subContents.slice(this.startnum*this.datanum,this.endnum*this.datanum);
                this.btnnum=Math.ceil(this.subContents.length/this.datanum);
                this.listnum=[];
                for(i=0;i<this.btnnum;i++){
                    this.listnum[i]=i+1;
                }
                btnwidth();
            },
            // 下一页函数
            nextlist(){
                if(this.endnum>= this.btnnum){
                    alert('最后一页了');
                    return false;
                }
                this.endnum++;
                this.startnum++;
            },
            // 上一页函数
            prevlist(){
                if(this.startnum<= 0){
                    alert('第一页了');
                    return false;
                }
                this.endnum--;
                this.startnum--;
            },
            // 按钮跳转到制定的页面
            jemppage(list){
                this.startnum=list-1;
                this.endnum=list;
            },
            // input跳抓
            goindex(){
                console.log(parseInt(this.jemp));
                if(parseInt(this.jemp)>this.btnnum){alert('请输入合法参数');return}
                this.endnum=this.jemp;
                this.startnum=this.jemp-1;
            }
        },
        // 使用一个监听。可以减少很多代码
        watch:{
            startnum(n,o){
                this.yemiandata=this.subContents.slice(n*this.datanum,(parseInt(n)+1)*this.datanum);
            }
        }
    });
    subList.filters(0);
    subList.fenye();
    // 封装一下底部btn方法 底部自动大小
    function btnwidth(){
        $('#fbtn').css({
            width:(subList.listnum.length+2)*40+293+'px',
            marginLeft:-((subList.listnum.length+2)*40+293)/2+'px'
        })
    }
    btnwidth();
</script>

<style scoped>

</style>