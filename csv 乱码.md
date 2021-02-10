https://www.zhihu.com/question/21869078


对于 CSV 文件，Excel 需要它有一个元信息来说明它的编码，那 CSV 是纯文本文件怎么设置元信息呢？微软就定义了一个自己的格式叫  BOM 头，这个 BOM 头在被其他的表格展示器（比如 Numbers 或者 Libre Office）打开的时候会被忽略，但对 Excel 就很关键了。我们应该在最根本的地方：产生 CSV 的地方加上它：// 产生 CSV 的过程，body: string[][], header: string[]
const csv = body.reduce((prev, current) => `${prev}\r\n${current}`, header);
// Excel 需要 BOM 头来说明它是 UTF-8
const BOM = Buffer.from('\uFEFF');
const bomCsv = Buffer.concat([BOM, Buffer.from(csv)]);
return bomCsv.toString();
// 现在返回的字符串被下载之后，用 Excel 打开就是完全正常的中文表格了

作者：林一二
链接：https://www.zhihu.com/question/21869078/answer/350728339
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。