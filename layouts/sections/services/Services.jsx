"use client";

import React, { useEffect, useState } from "react";
import { servicesApi } from "@/api/services/servicesApi";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    try {
      const res = await servicesApi.getServiceData();
      const sorted = res.data.sort((a, b) => a.order - b.order);
      setServices(sorted);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="w-full min-h-screen bg-background px-4 md:px-10 py-20">
      {/* 🔥 Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Our Services
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Transform your fitness journey with our premium offerings
        </p>
      </div>

      {/* 🔥 Stacking Cards */}
      <div className="relative flex flex-col items-center gap-10">
        {services.map((service, index) => {
          const offset = index * 40;

          return (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: offset }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: offset - 10 }}
              className="w-full max-w-4xl sticky top-24"
              style={{
                zIndex: services.length - index,
              }}
            >
              <Card className="overflow-hidden rounded-2xl shadow-xl border">
                {/* Image */}
                {service.image && (
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}

                {/* Content */}
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-xl font-bold">{service.price}</span>
                      <span className="text-sm text-muted-foreground">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
