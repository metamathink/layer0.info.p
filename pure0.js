// expression everything from atom, express atom from nothing.
// no compress
// posix format
// tar - debian 12 x64
// remember ini log

var show = console.log;

var Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));

var succ = n => f => x => f(n(f)(x));
var add = m => n => f => x => m(f)(n(f)(x));
var mult = m => n => f => m(n(f));
var pred = n => f => x => n(g => h => h(g(f)))(u => x)(u => u);
var sub = m => n => n(pred)(m);

var zero = f => x => x; // binop +
var one = succ(zero);   // binop -
var two = succ(one);    // binop *
var three = succ(two);  // binop /
var four = succ(three); // binop ==
var five = succ(four);  // binop <
var six = succ(five);   // binop >

var true0 = a => b => a;
var false0 = a => b => b;
var isZero = n => n(x => false0)(true0);
var leq = m => n => isZero(sub(m)(n));
var and = p => q => p(q)(p);
var not = p => a => b => p(b)(a);
var eq = m => n => and(leq(m)(n))(leq(n)(m));

var pair = a => b => f => f(zero)(a)(b);
var cn = a => f => f(one)(two)(a);
var isPair = x => eq(x(a => b => c => a))(zero);
var isCn = x => eq(x(a => b => c => a))(one);
var first = p => p(a => b => c => b);
var second = p => p(a => b => c => c);
var getcn = c => c(a => b => c => c);

var binop = op => e1 => e2 => pair(zero)(pair(op)(pair(e1)(pair(e2)(cn(zero)))));
// var isBinop = x => and(isPair(x))(eq(first(x))(zero));
var isBinop = x => isPair(x)(u => eq(first(x))(zero))(u => false0)(zero);
var binopOp = b => first(second(b));
var binopE1 = b => first(second(second(b)));
var binopE2 = b => first(second(second(second(b))));

var calcGen = calc => 
                  exp => not(isBinop(exp))
                          (u => getcn(exp))
                          (u => (op => 
                            eq(op)(zero)
                            (u => add(calc(binopE1(exp)))(calc(binopE2(exp))))
                            (u => 
                              eq(op)(three)
                              (u => sub(calc(binopE1(exp)))(calc(binopE2(exp))))
                              (u => mult(calc(binopE1(exp)))(calc(binopE2(exp))))
                              (zero))
                            (zero))
                            (binopOp(exp)))(zero);

var calc = Y(calcGen);

var exp1 = binop(zero)(binop(three)(binop(three)(cn(n2cn(17)))(cn(n2cn(5))))(cn(n2cn(3))))(binop(one)(cn(n2cn(2)))(cn(n2cn(5))));

show(cn2n(calc(exp1)));



// ---------------------------------------------

function cn2n(n)
{
  return n(x => x + 1)(0);
}

function n2cn(n)
{
  if (n == 0)
  {
    return zero;
  }
  else
  {
    return succ(n2cn(n - 1));
  }
}

// ---------------------------------------------

show(cn2n(sub(n2cn(3))(n2cn(5))));
show(eq(n2cn(1))(n2cn(2))(1)(2));


