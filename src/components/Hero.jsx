import React from 'react';
import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative w-full h-[560px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 h-full flex flex-col justify-end pb-10">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-xl">
          Peer-to-Peer Lending Platform
        </h1>
        <p className="mt-3 max-w-2xl text-slate-200/90 text-sm sm:text-base">
          Manage disbursements, repayments, and fees with a clear overview of balances and cash flow. Interactive 3D fintech experience powered by a glassmorphic aesthetic.
        </p>
      </div>
    </section>
  );
}

export default Hero;
