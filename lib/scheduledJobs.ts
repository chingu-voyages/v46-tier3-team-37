const cron = require('node-cron');
import prisma from "@/lib/prisma";

const updateTransactionStatuses = async () => {
  const transactions = await prisma.transaction.findMany();

  for (const transaction of transactions) {
    if (new Date() >= transaction.endDate) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'COMPLETED' },
      });
    } else if (new Date() >= transaction.startDate && new Date() <= transaction.endDate) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'ACTIVE' },
      });
    }
  }
};

// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await updateTransactionStatuses();
  } catch (error) {
    console.error('Error updating transaction statuses:', error);
  }
});
